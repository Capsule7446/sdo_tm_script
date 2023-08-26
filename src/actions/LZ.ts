import {Action} from "./Actions";
import React from "react";
import {GridRowsProp} from "@mui/x-data-grid";
import axios, {AxiosInstance, AxiosResponse} from "axios";

export class LZ extends Action {
	constructor() {
		super("礼赞 ", "https://chdact2.web.sdo.com/project/120629lz/home.asp",
				[
					{field: 'id', headerName: 'ID', type: 'number', width: 80},
					{field: 'name', headerName: '道具名称', width: 400},
					{field: 'token', headerName: '道具编码', width: 400},
				], []);
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
		instance.get('/project/120629lz/orderlist.asp', {
			params: {
				page: page,
				id: 2
			}
		}).then((response: AxiosResponse) => {
			console.log(` --- 獲取第 ${page} 頁資料 --- `)
			const parser = new DOMParser();
			const doc = parser.parseFromString(response.data, 'text/html');
			const trs = doc.querySelectorAll('tr')
			for (let index = 1; index < trs.length; index++) {
				let tr = trs[index]
				let row = tr.querySelectorAll(`td`)
				let item = {
					name: row[1].innerText,
					token: row[0].innerText
				}
				set(pre => [...pre, item])
			}
			if (trs.length == 12) {
				this.GetDataByPage(instance, set, page + 1)
			}
		});
	}

}