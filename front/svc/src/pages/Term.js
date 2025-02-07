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

const TermForm = (props) => {
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
                fileName: 'Term List Report',
            })}
            >
            Export Filtered rows
            </Button>
        </GridToolbarContainer>
        );
    };

    //-- DATA GRID Column Setting
    const columns = [
        { field: 'db_name', headerName: 'DB Name', width: 100, },
        { field: 'db_user', headerName: 'DB User', width: 100, },
        { field: 'term', headerName: 'Term', width: 150, },
        { field: 'term_name', headerName: 'Term Name', width: 300, },
        { field: 'data_type', headerName: 'Data Type', width: 150, },
        { field: 'term_desc', headerName: 'Term Description', width: 300, },
        { field: 'use_yn', headerName: 'Use Y/N', width: 100, align: 'center', },
        { field: 'create_id', headerName: 'Create ID', width: 100, },
        { field: 'create_dt', headerName: 'Create Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'update_id', headerName: 'Update ID', width: 100, },
        { field: 'update_dt', headerName: 'Update Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), }
    ];

    // List Inquiry (call Backend API)
    const propDbName = useRef(null);
    const propDbUser = useRef(null);

    const TERM_LIST_URL = "/api/db/select/termList";
    const [boardList, setBoardList] = useState([]);

    const fetchList = useCallback(async () => { 
        try {
            //console.log("fetchList" + props.inputs.term);
            setLoadingYn(true);
            axios(TERM_LIST_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8", 
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials":"true",},
                params: { 
                    db_name: propDbName.current,
                    db_user: propDbUser.current,
                    term: props.inputs.term,
                    term_name: props.inputs.termName,
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

    // Function called when the term, termname changed
    useEffect(() => {
        //console.log("TermForm: useEffect" + props.inputs.term);
        // Inquiry condition setting (get from the parent prop)
        propDbName.current = props.dbName.current;
        propDbUser.current = props.dbUser.current;
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

const Term = () => {
    const navigate = useNavigate();
    //Inquiry condition setting
    const dbName = useRef("TEAMEX");
    const dbUser = useRef("SVC");

    const [inputs, setInputs] = useState({
        term: "",
        termName: "",
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
        //console.log("Term : useEffect");
        //Login Check
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', m: 1, mt: 2}}>
                <TextField label="DB Name"
                           defaultValue={dbName.current}
                           onChange={(newValue) => {dbName.current = newValue;}}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           slotProps={{
                               input: {
                                   readOnly: true,
                               },
                           }}
                           sx={{mr:1}}
                />
                <TextField defaultValue={dbUser.current}
                           label="DB User"
                           onChange={(newValue) => {dbUser.current = newValue;}}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           slotProps={{
                               input: {
                                   readOnly: true,
                               },
                           }}
                           sx={{mr:1}}
                />
                <TextField name="term"
                           value={inputs.term}
                           label="Term"
                           onChange={handleChange}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           sx={{mr:1}}
                           focused
                />
                <TextField name="termName"
                           value={inputs.termName}
                           label="Term Name"
                           onChange={handleChange}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           sx={{ml:1}}
                           focused
                />
            </Box>
            <Box sx={{ height: '77vh', width: '78vw', m: 1, mt: 2}}>
                <TermForm dbName={dbName} dbUser={dbUser} inputs={inputs} />
            </Box>
            
        </Box>
    );
}

export default Term;