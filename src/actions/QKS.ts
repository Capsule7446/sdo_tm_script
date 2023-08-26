import React from "react";
import {Action} from "./Actions";
import {GridRowsProp} from "@mui/x-data-grid";
import axios, {AxiosInstance, AxiosResponse} from "axios";

interface QKSResponseType {
	result: string,
	message: string,
	datalist: { CreateTime: string, OrderId: string, ItemName: string, couponNum: string }[],
	pagelast: string,
	pagefront: string,
	pagenext: string
}

export class QKS extends Action {
	constructor() {
		super("其卡斯的宝藏", "https://chdact2.web.sdo.com/project/Chicas", [
			{field: 'id', headerName: 'ID', type: 'number', width: 80},
			{field: 'dateTime', headerName: '获得时间', width: 300},
			{field: 'mapId', headerName: '地图编号', width: 200},
			{field: 'name', headerName: '道具名称', width: 400},
			{field: 'token', headerName: '道具编码', width: 400},
			{field: 'isNow', headerName: '当期宝物', type: 'boolean', width: 100},
		], []);
	}

	GetData(set: React.Dispatch<React.SetStateAction<GridRowsProp>>): void {
		const instance = axios.create({
			baseURL: 'https://chdact2.web.sdo.com',
			timeout: 1000,
			method: 'get',
			responseType: 'text',
			responseEncoding: 'utf-8',
		})
		this.GetDataByPage(instance, set, 1, 2)
		this.GetDataByPage(instance, set, 1, 1)
	}

	async GetDataByPage(instance: AxiosInstance, set: React.Dispatch<React.SetStateAction<GridRowsProp>>, page: number, ctype: number) {
		instance.get('/project/Chicas/inc/getorder.asp', {
			params: {
				page: page,
				ctype: ctype
			}
		}).then((response: AxiosResponse) => {
			console.log(` --- 獲取第 ${page} 頁資料 --- `)
			let result: QKSResponseType = JSON.parse(response.data)
			result.datalist.forEach(item => {
				set(pre => [...pre, {
					dateTime: item.CreateTime,
					mapId: item.couponNum,
					name: item.ItemName,
					token: item.OrderId,
					isNow: 1 == ctype
				}])
			})

			if (result.datalist.length == 7) {
				this.GetDataByPage(instance, set, page + 1, ctype)
			}
		});
	}

}