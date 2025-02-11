import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// MUI
import { Paper, Box, Button, TextField, Grid, Typography } from '@mui/material';
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
import { styled } from '@mui/system';

const TableListForm = (props) => {
    //DATA GRID Setting
    //-- loading state
    const [loadingYn, setLoadingYn] = useState(false);
    //-- Data Grid toolbar setting
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer />
        );
    };

    //-- DATA GRID Column Setting
    const columns = [
        { field: 'table_name', headerName: 'Table Name', width: 130, },
        { field: 'table_comments', headerName: 'Table Comments', width: 130, },
        { field: 'tablespace_name', headerName: 'Tablespace', width: 100, },
        { field: 'use_yn', headerName: 'Use Y/N', width: 100, },
    ];

    // List Inquiry (call Backend API)
    const propDbName = useRef(null);
    const propDbUser = useRef(null);

    const TABLE_LIST_URL = "/api/db/select/tableList";
    const [boardList, setBoardList] = useState([]);

    const fetchList = useCallback(async () => { 
        try {
            //console.log("fetchList" + props.inputs.tableName);
            setLoadingYn(true);

            axios(TABLE_LIST_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8", 
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials":"true",},
                params: { 
                    db_name: propDbName.current,
                    db_user: propDbUser.current,
                    table_name: props.inputs.tableName,
                    table_comments: props.inputs.tableComments,
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

    //Row click on table list : set table Head info, inquiry table detail info
    const handleRowClick = (
        params,  // GridCellParams<any>
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        if(params.row.table_name ==="" || params.row.table_name===null) return;
        props.setTable({
            table_name: params.row.table_name,
            table_comments: params.row.table_comments,
            tablespace_name: params.row.tablespace_name,
            use_yn: params.row.use_yn,
            create_id: params.row.create_id,
            create_date: params.row.create_date,
            update_id: params.row.update_id,
            update_date: params.row.update_date,
        });
    };

    // Function called when the table, table_name changed
    useEffect(() => {
        //console.log("TableListForm: useEffect" + props.inputs.table_name);
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
            onRowClick={handleRowClick}
            autoPageSize
            slots={{
                toolbar: CustomToolbar,
            }}
            slotprops={{
                loadingOverlay: {
                    variant: 'linear-progress',
                    noRowsVariant: 'linear-progress',
                },
            }}
            loading={loadingYn}
            density='compact'
            sx={{
                '.MuiDataGrid-columnHeaderTitle' : {
                    whiteSpace: 'pre-line', // multi-line allowance
                    lineHeight: '1',  
                    textAlign: 'center',
                },
            }}
            hideFooterSelectedRowCount
        />
    );
}

const TableDetailForm = (props) => {
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
                slotprops={{ tooltip: { title: 'Change density' } }}
            />
            
            <Button
            {...buttonBaseProps}
            onClick={() => handleExport({ 
                getRowsToExport: getFilteredRows,
                fileName: 'Table List Report',
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
        { field: 'column_name', headerName: 'Column Name', width: 200, },
        { field: 'manual_yn', headerName: 'Manual Y/N', width: 100, align: 'center', },
        { field: 'data_type', headerName: 'Data Type', width: 200, },
        { field: 'key_yn', headerName: 'Key', width: 100, align: 'center', },
        { field: 'nullable', headerName: 'Nullable', width: 100, align: 'center', },
        { field: 'default_data', headerName: 'Default Data', width: 130, },
        { field: 'column_desc', headerName: 'Description', width: 300, },
        { field: 'column_comments', headerName: 'Comments', width: 300, },
        { field: 'column_seq', headerName: 'Seq', width: 100, align: 'right', },
        { field: 'create_id', headerName: 'Create ID', width: 100, },
        { field: 'create_dt', headerName: 'Create Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'update_id', headerName: 'Update ID', width: 100, },
        { field: 'update_dt', headerName: 'Update Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), }
    ];

    // List Inquiry (call Backend API)
    const propDbName = useRef(null);
    const propDbUser = useRef(null);

    const TABLE_DETAIL_URL = "/api/db/select/tableDetail";
    const [boardList, setBoardList] = useState([]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f6f6f6',
        ...theme.typography.subtitle2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize: '9pt',
    }));
    const Typo = styled(Typography)(({theme}) => ({
        fontSize: '10pt',
    }))

    const fetchList = useCallback(async () => { 
        try {
            //console.log("fetchList" + props.table.table_name);
            setLoadingYn(true);

            axios(TABLE_DETAIL_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8", 
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials":"true",},
                params: { 
                    db_name: propDbName.current,
                    db_user: propDbUser.current,
                    table_name: props.table.table_name,
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
    },[props.table]);

    // Function called when select one table name
    useEffect(() => {
        //console.log("TableuForm: useEffect" + props.table.table);
        // Inquiry condition setting (get from the parent prop)
        propDbName.current = props.dbName.current;
        propDbUser.current = props.dbUser.current;
        // Call List inquiry function
        fetchList();
    }, [props.table]);

    return(
        <>
            <Box sx={{ display: 'flex', height: '10%', width: '55vw', m: 1, mt: 2}}>
                <Grid container spacing={1}>
                    <Grid item xs={2.5}>
                        <Item variant="outlined">Table Name</Item>
                    </Grid>
                    <Grid item xs={4} mt={1}>
                        <Typo variant="button">
                            {props.table.table_name}
                        </Typo>
                    </Grid>
                    <Grid item xs={2.5}>
                        <Item variant="outlined">Tablespace</Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                        <Typo variant="button">
                            {props.table.tablespace_name}
                        </Typo>
                    </Grid>
                    <Grid item xs={2.5}>
                        <Item variant="outlined">Table Comments</Item>
                    </Grid>
                    <Grid item xs={9.5} mt={1}>
                        <Typo variant="button">
                            {props.table.table_comments}
                        </Typo>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ display: 'flex', height: '90%', width: '55vw', m: 1, mt: 2}}>
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
                slotprops={{
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
            </Box>
        </>
    );
}

const Table = () => {
    const navigate = useNavigate();
    //Inquiry condition setting
    const dbName = useRef("TEAMEX");
    const dbUser = useRef("SVC");

    const [inputs, setInputs] = useState({
        tableName: "",
        tableComments: "",
    });
    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };
    
    //Control Selected table
    const [table, setTable] = useState({
        table_name: "",
        table_comments: "",
        tablespace_name: "",
        use_yn: "",
        create_id: "",
        create_date: "",
        update_id: "",
        update_date: "",
    });

    // function called when the window first rendering
    useEffect(() => {
        //console.log("Table : useEffect");
        //Login Check
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', m: 1, mt: 2 }}>
                <TextField label="DB Name"
                           defaultValue={dbName.current}
                           onChange={(newValue) => {dbName.current = newValue;}}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           slotprops={{
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
                           slotprops={{
                               input: {
                                   readOnly: true,
                               },
                           }}
                           sx={{mr:1}}
                />
                <TextField name="tableName"
                           value={inputs.tableName}
                           label="Table Name"
                           onChange={handleChange}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           sx={{ml:1}}
                           focused
                />
                <TextField name="tableComments"
                           value={inputs.tableComments}
                           label="Table Comments"
                           onChange={handleChange}
                           size="small"
                           inputProps={{style: {fontSize: 14}}}
                           sx={{ml:1}}
                           focused
                />
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-start", width: '77vw' }}>
                <Box sx={{ display: 'flex', height: '77vh', width: '20vw', mr: 2 }}>
                    <TableListForm dbName={dbName} dbUser={dbUser} inputs={inputs} setTable={setTable} />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="top" 
                    sx={{ height: '70vh', width: '50vw'}}>
                    <TableDetailForm dbName={dbName} dbUser={dbUser} table={table} />
                </Box>
            </Box>
        </Box>
    );
}

export default Table;