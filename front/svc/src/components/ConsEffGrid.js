import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from "react";
import axios from 'axios';
import dayjs from 'dayjs';

// MUI
import { Button } from '@mui/material';
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

function ConsEffGrid(props) {
    //# Tab2. List
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
                    fileName: 'Efficiency of SOW',
                })}
            >
            Export Filtered rows
            </Button>
          </GridToolbarContainer>
        );
    };

    //-- DATA GRID Column Setting
    const columns = [
        { field: 'sow_type', headerName: 'SOW\nType', width: 60, align: 'center', },
        { field: 'warranty_yn', headerName: 'In warranty\n(Y/N)', width: 90, align: 'center', },
        { field: 'gen_type', headerName: 'GEN Type', width: 140, },
        { field: 'site_cd', headerName: 'SITE', width: 100, },
        { field: 'station_id', headerName: 'Station ID', width: 100, },
        { field: 'site_name', headerName: 'Site Name.', width: 200, },
        { field: 'address', headerName: 'Address', width: 200, },
        { field: 'city', headerName: 'City', width: 140, },
        { field: 'state_cd', headerName: 'State', width: 70, align: 'center', },
        { field: 'zip_cd', headerName: 'ZIP', width: 70, },
        { field: 'teamex_office', headerName: 'Teamex\nOffice', width: 100, },
        { field: 'elam_case', headerName: 'ELAM CASE', width: 100, },
        { field: 'mfr_case', headerName: 'MFR Case', width: 120, },
        { field: 'code', headerName: 'Code', width: 80, },
        { field: 'new_code', headerName: 'New Code', width: 100, },
        { field: 'description', headerName: 'Description', width: 250, },
        { field: 'swh_in_dec', headerName: 'SWH\n(in decimal)', width: 100, type: Number, align: 'right', },
        { field: 'swh_in_time', headerName: 'SWH\n(in time)', width: 80, align: 'center', },
        { field: 'awh_in_dec', headerName: 'AWH(CI-CO)\n-15mins\n[in decimal]', width: 110, type: Number, align: 'right', },
        { field: 'awh_in_time', headerName: 'AWH(CI-CO)\n-15mins\n[in tme]', width: 110, align: 'center', },
        { field: 'efficiency', headerName: 'Efficiency', width: 80, type: Number, align: 'right', },
        { field: 'check_in_1', headerName: 'Check-in1', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_out_1', headerName: 'Check-out1', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_in_2', headerName: 'Check-in2', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_out_2', headerName: 'Check-out2', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_in_3', headerName: 'Check-in3', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_out_3', headerName: 'Check-out3', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_in_4', headerName: 'Check-in4', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_out_4', headerName: 'Check-out4', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_in_5', headerName: 'Check-in5', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'check_out_5', headerName: 'Check-out5', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
        { field: 'priority_level', headerName: 'Priority\nLevel', width: 100, },
        { field: 'case_opened_date', headerName: 'Case Opened\nDate', width: 100, type: 'date', valueGetter: (value) => value && new Date(value), },
        { field: 'case_owner', headerName: 'Case Owner', width: 170, },
        { field: 'issue', headerName: 'Issue', width: 200, },
        { field: 'recommended_parts', headerName: 'Recommended parts', width: 150, },
        { field: 'so_no', headerName: 'SO', width: 140, },
        { field: 'rma', headerName: 'RMA', width: 120, },
        { field: 'need_parts', headerName: 'Need\nParts?\n(Y/N)', width: 90, },
        { field: 'status_of_parts', headerName: 'Status of\nParts', width: 90, },
        { field: 'tracking_number', headerName: 'Tracking\nNumber', width: 90, type: Number, align: 'right', },
        { field: 'eta_of_parts', headerName: 'ETA of\nParts', width: 90, },
        { field: 'date_wo_released', headerName: 'Date WO\nreleased\n(MM/DD/YYYY)', width: 130, type: 'date', valueGetter: (value) => value && new Date(value), align: 'center', },
        { field: 'work_order', headerName: 'WO', width: 100, },
        { field: 'fs_no', headerName: 'FS Number', width: 120, },
        { field: 'assigned_to', headerName: 'Assigned to', width: 180,  },
        { field: 'est_start_date', headerName: 'EST\nStart date\n(MM/DD/YYYY)', width: 120, type: 'date', valueGetter: (value) => value && new Date(value), align: 'center', },
        { field: 'date_of_visit', headerName: 'Date of\nvisit\n(MM/DD/YYYY)', width: 120, type: 'date', valueGetter: (value) => value && new Date(value), align: 'center',  },
        { field: 'rtat', headerName: 'RTAT', width: 70, type: Number, align: 'right', },
        { field: 'dispatch_status', headerName: 'Dispatch\nStatus', width: 90, align: 'center', },
        { field: 'pending_issue', headerName: 'Notes / Pending  Issue', width: 200, },
        { field: 'reason_of_cancellation', headerName: 'Reason of cancellation', width: 100, },
        { field: 'date_wo_cancel', headerName: 'Date WO\nCancel', width: 150, type: 'date', valueGetter: (value) => value && new Date(value), },
        { field: 'fr_no', headerName: 'FR#', width: 120, align: 'center', },
    ];
    
    // List Retrieve (call Backend API)
    const propFrDate = useRef(null);
    const propToDate = useRef(null);

    const [visitList, setVisitList] = useState([]);
    const VISIT_DATA_LIST_URL = "/api/consolidation/select/visitData";
    
    const fetchList = useCallback(async () => { 
        try {
            setLoadingYn(true);
            axios(VISIT_DATA_LIST_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8", 
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials":"true",},
                params: { 
                    div: sessionStorage.getItem("div"),
                    date_fr: propFrDate.current,
                    date_to: propToDate.current
                },
            })
            .then((res) => {
                setVisitList(res.data);
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
    },[]);

    // Function called when the search button clicked
    useEffect(() => {
        //console.log("ConsEffGrid : effect");
        // Inquiry period setting (get from the parent prop)
        propFrDate.current = dayjs(props.frDate.current).format('MM/DD/YYYY');
        propToDate.current = dayjs(props.toDate.current).format('MM/DD/YYYY');
        // Call List inquiry function
        fetchList();
    }, [props.search]);

    return(
        <DataGrid
            rows={visitList}
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

export default ConsEffGrid;
