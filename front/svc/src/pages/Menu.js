import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// MUI
import { Box, Button, TextField } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  gridExpandedSortedRowIdsSelector,
  useGridApiContext,
} from '@mui/x-data-grid';

const MenuForm = (props) => {
    //DATA GRID Setting
    //-- paging
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    //-- loading state
    const [loadingYn, setLoadingYn] = useState(false);
    //-- Data Grid toolbar setting
    const CustomToolbar = () => {
        const apiRef = useGridApiContext();
        const getFilteredRows = ({ apiRef }) => gridExpandedSortedRowIdsSelector(apiRef);
        const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

        const buttonBaseProps = {
            color: 'primary',
            size: 'small',
            startIcon: <FileDownloadOutlinedIcon />,
        };

        return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector
            slotProps={{ tooltip: { title: 'Change density' } }}
            />
            
            <Button
            {...buttonBaseProps}
            onClick={() => handleExport({ 
                getRowsToExport: getFilteredRows,
                fileName: 'Menu List Report',
            })}
            >
            Export Filtered rows
            </Button>
        </GridToolbarContainer>
        );
    };

    //-- DATA GRID Column Setting
    const columns = [
        { field: 'program_id', headerName: 'Program ID', width: 100, },
        { field: 'menu_id', headerName: 'Menu ID', width: 130, },
        { field: 'lvl', headerName: 'Level', width: 80, align: 'right', },
        { field: 'menu_name', headerName: 'Menu Name', width: 200, },
        { field: 'window_yn', headerName: 'Window Y/N', width: 100, align: 'center', },
        { field: 'parent_menu', headerName: 'Parent Menu', width: 130, },
        { field: 'remark', headerName: 'Remark', width: 300, },
        { field: 'sort', headerName: 'Sort', width: 100, align: 'right', },
        { field: 'create_id', headerName: 'Create ID', width: 100, },
        { field: 'create_dt', headerName: 'Create Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'update_id', headerName: 'Update ID', width: 100, },
        { field: 'update_dt', headerName: 'Update Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), }
    ];

    // List Inquiry (call Backend API)
    const propProgramId = useRef(null);

    const MENU_LIST_URL = "/api/system/select/menuList";
    const [boardList, setBoardList] = useState([]);

    const fetchList = useCallback(async () => { 
        try {
            //console.log("fetchList" + props.inputs.menuName);
            setLoadingYn(true);
            axios(MENU_LIST_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8", 
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials":"true",},
                params: { 
                    program_id: propProgramId.current,
                    menu_name: props.inputs.menuName,
                },
            })
            .then((res) => {
                setBoardList(res.data);
            })
            .catch((e) => {
                console.error(e);
                alert(e);
            })
            .finally(() => {
                setLoadingYn(false);
            });
        } catch (err) {
            console.log(err);
            alert(err);
        }
    },[props.inputs]);

    // Function called when the menu, menuName changed
    useEffect(() => {
        //console.log("MenuForm: useEffect" + props.inputs.menu);
        // Inquiry condition setting (get from the parent prop)
        propProgramId.current = props.programId.current;
        // Call List inquiry function
        fetchList();
    }, [props.inputs]);

    return(
        <DataGrid
            rows={boardList}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
            }}
            slots={{
                toolbar: CustomToolbar,
            }}
            slotProps={{
                loadingOverlay: {
                    variant: 'linear-progress',
                    noRowsVariant: 'linear-progress',
                },
            }}
            loading={loadingYn}
            density='compact'
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{
                '.MuiDataGrid-columnHeaderTitle' : {
                    whiteSpace: 'pre-line', // multi-line allowance
                    lineHeight: '1',  
                    textAlign: 'center',
                },
            }}
        />
    );
}

const Menu = () => {
    const navigate = useNavigate();
    //Inquiry condition setting
    const programId = useRef("SVC_WEB");

    const [inputs, setInputs] = useState({
        menu: "",
        menuName: "",
    });
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };
    
    //Grid inquiry (Do not use on this page)
    const fetchList = () => {
        //setSearch(search +1);
    };

    // function called when the window first rendering
    useEffect(() => {
        //console.log("Menu : useEffect");
        //Login Check
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', m: 1, mt: 2}}>
                <TextField label="Program ID"
                           defaultValue={programId.current}
                           onChange={(newValue) => {programId.current = newValue;}}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           slotProps={{
                               input: {
                                   readOnly: true,
                               },
                           }}
                           sx={{mr:1}}
                />
                <TextField name="menuName"
                           value={inputs.menuName}
                           label="Menu Name"
                           onChange={handleChange}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           sx={{mr:1}}
                           focused
                />
            </Box>
            <Box sx={{ height: '77vh', width: '78vw', m: 1, mt: 2}}>
                <MenuForm programId={programId} inputs={inputs} />
            </Box>
            
        </Box>
    );
}

export default Menu;