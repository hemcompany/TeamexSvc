import * as React from 'react';
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import axios from 'axios';
// MUI
import { Box, Button, Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    useGridApiRef,
} from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TmxPagination from '../components/TmxPagenation';
// Reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";
import { Core, PdfExport } from "@grapecity/activereports";

// All tab use
const reportPath = "/reports/fieldRepair.rdlx-json";   //REPORT form path
//Report Pdf Export Setting
const setExportSetting = (param) => {
    return {
        pdf: {
            printing: "none",
            copying: false,
            modifying: false,
            annotating: false,
            contentAccessibility: false,
            documentAssembly: false,
            pdfVersion: "1.7",
            autoPrint: false,
            filename: param,
            title: param,
            author: "Teamex",
        },
    };
}

//=== TAB1 - List ===
const Tab1ListForm = (props) => {
    //DATA GRID Setting
    const apiRef = useGridApiRef();
    //-- loading state
    const [loadingYn, setLoadingYn] = useState(false);
    //-- Data Grid toolbar setting
    function CustomToolbar() {
        return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector
            slotProps={{ tooltip: { title: 'Change density' } }}
            />
        </GridToolbarContainer>
        );
    }
    //-- DATA GRID Column Setting
    const columns = [
        { field: 'reportno', headerName: 'Report NO.', width: 150, 
            renderCell: (params) => (<span style={{ color: 'blue' }}>{params.value}</span>), },
        { field: 'report_sts', headerName: 'Status', width: 70, },
        { field: 'visit_dt', headerName: 'Visit Date', type: Date, width: 100, },
        { field: 'technician', headerName: 'Technician(s)', width: 150, },
        { field: 'ev_car', headerName: 'Ev Car', width: 150, },
        { field: 'cust_cd', headerName: 'Cust Code', width: 110, },
        { field: 'bill_to_cust', headerName: 'Bill To Cust', width: 110, },
    ];

    // List Inquiry (call Backend API)
    const FIELD_REPAIR_LIST_URL = "/api/fieldRepair/select/list";
    const [boardList, setBoardList] = useState([]);

    const fetchList = useCallback(async () => { 
        try {
            //console.log("Tab1ListForm fetchList" + props.inputs.frDate);
            setLoadingYn(true);
            axios(FIELD_REPAIR_LIST_URL, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json;charset=UTF-8", 
                  "Accept": "application/json",
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Access-Control-Allow-Credentials":"true",},
                params: { 
                  div: sessionStorage.getItem("div"),
                  visit_fr: dayjs(props.inputs.frDate).format('MM/DD/YYYY'),
                  visit_to: dayjs(props.inputs.toDate).format('MM/DD/YYYY')
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

    // REPORT EXPORT directly at the List
    const exportReportByList = async () => {
        if (apiRef.current === null) {
          apiRef.current = {};
        }
        const selectedRows = apiRef.current.getSelectedRows();
        const selectedNo = Array.from(selectedRows.keys());
        const arrCount = selectedNo.length;
        for (let i=0; i< arrCount; i++){
            props.reportno.current = selectedNo[i];
            const report = new Core.PageReport();
            await report.load(reportPath,{
                reportParameters: [
                    {
                        Name: "reportno",
                        Value: selectedNo[i],
                    },
                ],
            });
            const doc = await report.run();
            const result = await PdfExport.exportDocument(doc, setExportSetting(selectedNo[i]));
            result.download(selectedNo[i]);
        }
    }

    //When click the Report NO. on the left list : Move to the Tab2 and inquiry the Report
    const handleCellClick = (
        params,  // GridCellParams<any>
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
      if ( params.field === 'reportno'){
            props.reportno.current = params.value;
            props.setValue(1);
      }
    };

    // Function called when the from ~ to date changed
    useEffect(() => {
        //console.log("Tab1Form: useEffect" + props.inputs.frDate);
        // Inquiry condition setting (get from the parent prop)

        // Call List inquiry function
        fetchList();
    }, [props.search]);

    return(
        <>
        <Box sx={{ display: 'flex', m: 1, }}>
            <DatePicker 
                label="Visit Date From" 
                format="MM/DD/YYYY"
                defaultValue={props.inputs.frDate}
                onChange={(newValue) => {props.inputs.frDate =  newValue;}}
                sx={{ mr: 1}}
                slotProps={{ textField: { size: 'small', inputRef: props.inputs.frDate } }}
            />
            ~ 
            <DatePicker 
                label="Visit Date To" 
                format="MM/DD/YYYY"
                defaultValue={props.inputs.toDate}
                onChange={(newValue) => {props.inputs.toDate = newValue;}}
                sx={{ mr: 1}}
                slotProps={{ textField: { size: 'small', inputRef: props.inputs.toDate } }}
            />
            <Button 
                variant="outlined" 
                size="small"
                sx={{ ml: 1}}
                startIcon={<SearchOutlinedIcon />}
                onClick={() => {
                    fetchList();
                }}>Search
            </Button>
            <Button 
                variant="outlined" 
                size="small"
                startIcon={<FileDownloadIcon />}
                sx={{ ml: 1}}
                onClick={() => {
                    exportReportByList();
                }}>Export
            </Button>
        </Box>
        <Box sx={{height: '72vh', width: '76vw'}}>
            <DataGrid
                rows={boardList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {pageSize: 25, page: 0},
                    }
                }}
                initialPsgeSize={25}
                pagination
                slots={{
                    toolbar: CustomToolbar,
                    pagination: (props) => <TmxPagination {...props} apiRef={apiRef} />,
                }}
                slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'linear-progress',
                    },
                }}
                onCellClick={handleCellClick}
                loading={loadingYn}
                density='compact'
                checkboxSelection
                disableRowSelectionOnClick     //ROW 선택 시 체크박스 체크 되지 않도록(체크박스 클릭시만 체크)
                apiRef={apiRef}
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

//=== TAB2 Report ===
const Tab2ReportForm = (props) => {
    const viewerRef = React.useRef(null);
    // REPORT export type setting
    const availableExports = ["pdf"]; //, "html", "tabular-data"
    // export button to sidebar (upper)
    const panelsLayout = "sidebar";
    const toolbarLayout = {
        default: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        fullscreen: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        mobile: ["$navigation","$split","$refresh","$split","$zoom","$split"]
    };

    //Inquiry Report Viewer
    useEffect(() => {
        //console.log("Tab2ReportForm useEffect " + props.reportno.current);
        try {
            if (props.reportno.current== null) return;
            if (!viewerRef.current) return;
            const viewer = viewerRef.current;
            if (viewer) {
                viewer.open(
                    reportPath, {
                    ReportParams: [
                        {
                            Name: "reportno",
                            Value: props.reportno.current,
                        },
                    ],
                });
                viewer.panelsLayout = {panelsLayout};
            }
        } catch(error) {}
    },[props.search]); 

    return (
        <div id="designer-host" style={{ height: '100%', width: '100%' }} >
            <Viewer 
              ref={viewerRef} 
              exportsSettings={setExportSetting(props.reportno.current)}
              availableExports={availableExports}
              toolbarLayout={toolbarLayout}
            />
          </div>
    );
}

const FieldReport = () => {
    // === TAB === 
    const [value, setValue] = useState(0);  //Save Tab Index Value
    const tabChange = (event, newValue) => {
        setValue(newValue);
    };
    const CustomTabPanel = (props) => { 
        const { children, value, index } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
            {value === index && (
                <Container  sx={{p: 1}}>
                    <Box>{children}</Box>
                </Container>
            )}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
                'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    //== Inquiry condition setting
    const navigate = useNavigate();

    const reportno = useRef(null);      //Save selected Reportno No.
    const [inputs, setInputs] = useState({
        frDate: dayjs().add(-1, 'month'),
        toDate: dayjs(),
    });
    const [search, setSearch] = useState(0); //Search Button state

    //Report / Grid inquiry
    const fetchList = () => {
        setSearch(search +1);
    };

    // function called when the window first rendering
    useEffect(() => {
        //console.log("FieldRepair : useEffect");
        //Login Check
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
    }, []);
    
    return (
        <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={tabChange}>
                    <Tab label="List" {...a11yProps(0)} />
                    <Tab label="Report" {...a11yProps(1)} />
                </Tabs>
            </Box>
            
            <CustomTabPanel value={value} index={0}>
                <Box>
                    <Tab1ListForm inputs={inputs} setInputs={setInputs} reportno={reportno} setValue={setValue} search={search}/>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} >
                <Box sx={{ display: 'flex', height: '77vh', width: '77vw' }}>
                    <Tab2ReportForm inputs={inputs} reportno={reportno} search={search}/>
                </Box>
            </CustomTabPanel>
        </Box>
    );
}

export default FieldReport;