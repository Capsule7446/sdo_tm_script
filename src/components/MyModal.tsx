import React, { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
    DataGrid,
    GridToolbar,
    GridRowsProp,
    GridFilterModel,
    GridColumnVisibilityModel,
} from '@mui/x-data-grid';
import { Action } from "../actions";




interface ModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: Action
}


const MyModal: React.FC<ModalProps> = (props: ModalProps) => {
    const [rows, setRow] = useState<GridRowsProp>([])
    const [showRows, setShowRows] = useState<GridRowsProp>([])
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [],
        quickFilterExcludeHiddenColumns: true,
        quickFilterValues: [''],
    });

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({});


    useEffect(() => {
        props.data.GetData(setRow)
    }, [])

    useEffect(() => {
        setShowRows(rows.filter(
            (row, index, self) => index === self.findIndex(r => r.token === row.token)
        ).map((v, i) => {
            v.id = i + 1
            return v
        }))
    }, [rows])

    return <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `90%`,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: `24`,
            p: `4`,
            zIndex: `10000`
        }}>
            <DataGrid
                columns={props.data.Columns}
                rows={showRows}
                disableColumnFilter
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                filterModel={filterModel}
                onFilterModelChange={(newModel) => setFilterModel(newModel)}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
            />
        </Box>
    </Modal>
}
export { MyModal }