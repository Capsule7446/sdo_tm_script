import {GridColDef, GridRowsProp} from '@mui/x-data-grid';

abstract class Action {
	public Name: string;
	public Url: RegExp;
	public Columns: GridColDef[];
	public Data: GridRowsProp;

	protected constructor(name: string, url: RegExp, columns: GridColDef[], data: GridRowsProp) {
		this.Name = name
		this.Url = url;
		this.Columns = columns;
		this.Data = data;
	}


	// abstract MatchURL(): boolean;
	abstract GetData(set: React.Dispatch<React.SetStateAction<GridRowsProp>>): void

	public MatchURL(): boolean {
		return this.Url.test(window.location.href);
	}
}

export {Action}