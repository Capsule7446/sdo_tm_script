import {GridColDef, GridRowsProp} from '@mui/x-data-grid';

abstract class Action {
	public Name: string;
	public Url: string;
	public Columns: GridColDef[];
	public Data: GridRowsProp;

	constructor(name: string, url: string, columns: GridColDef[], data: GridRowsProp) {
		this.Name = name
		this.Url = url;
		this.Columns = columns;
		this.Data = data;
	}


	// abstract MatchURL(): boolean;
	abstract GetData(set: React.Dispatch<React.SetStateAction<GridRowsProp>>): void

	public MatchURL(): boolean {
		if (window.location.href.includes(this.Url)) {
			return true
		} else {
			const nowUrl = new URL(window.location.href);
			const tagretUrl = new URL(this.Url)
			if (nowUrl.host == tagretUrl.host && nowUrl.pathname == tagretUrl.pathname) {
				console.log(`「${this.Name}」匹配成功`)
				return true
			}
		}
		return false;
	}
}

export {Action}