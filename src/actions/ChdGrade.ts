import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {Action} from '.';
import {GridRowsProp} from '@mui/x-data-grid';

/**
 * 等级补完
 */
class ChdGrade extends Action {

	constructor() {
		super("等級補完",
				/^https:\/\/chdact2\.web\.sdo\.com\/project\/ChdGrade\/.*/,
				[
					{field: 'id', headerName: 'ID', type: 'number', width: 80},
					{field: 'dateTime', headerName: '购买日期', type: 'date', width: 200},
					{field: 'orderId', headerName: '订单编号', width: 400},
					{field: 'packageName', headerName: '礼包代码', width: 150},
					{field: 'name', headerName: '道具名称', width: 150},
					{field: 'token', headerName: '道具编码', width: 400},
				], [])
	}

	GetData(set: React.Dispatch<React.SetStateAction<GridRowsProp>>) {
		const instance = axios.create({
			baseURL: 'https://chdact2.web.sdo.com',
			timeout: 1000,
			method: 'get',
			responseType: 'text',
			responseEncoding: 'utf-8'
		})
		this.GetDataByPage(instance, set, 1)
	}

	async GetDataByPage(instance: AxiosInstance, set: React.Dispatch<React.SetStateAction<GridRowsProp>>, page: number) {
		instance.get('/project/ChdGrade/order.asp', {
			params: {
				page: page
			}
		}).then((response: AxiosResponse) => {
			console.log(` --- 獲取第 ${page} 頁資料 --- `)
			const parser = new DOMParser();
			const doc = parser.parseFromString(response.data, 'text/html');
			const trs = doc.querySelectorAll('tr')
			for (let index = 1; index < trs.length; index++) {
				let tr = trs[index]
				let tds = tr.querySelectorAll(`td`)
				if (tds[3].querySelectorAll('br').length > 0) {
					let names = tds[3].innerHTML.split('<br>').filter(k => k != '')
					let tokens = tds[4].innerHTML.split('<br>').filter(k => k != '')
					for (let index2 = 0; index2 < names.length; index2++) {
						let item = {
							dateTime: new Date(tds[0].innerHTML.replace("<br>", " ")),
							orderId: tds[1].innerHTML,
							packageName: tds[2].innerHTML,
							name: names[index2],
							token: tokens[index2]
						}
						set((pre) => {
							return [...pre, item]
						})
					}
				}
			}
			if (trs.length == 11) {
				this.GetDataByPage(instance, set, page + 1)
			}
		});
	}


}

export {ChdGrade}