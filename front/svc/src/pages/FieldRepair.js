import * as React from 'react';

import dayjs from 'dayjs';
import PropTypes from 'prop-types';
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
//reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";
import { Core, PdfExport } from "@grapecity/activereports";

//TAB
function CustomTabPanel(props) { 
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Container  sx={{ p: 1}}>
            <Box>
              {children}
            </Box>
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
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

//TAB1 - LIST
const columns = [
  { field: 'reportno', 
    headerName: 'Report NO.', 
    width: 150,
    color: 'blue',
  },
  {
    field: 'report_sts',
    headerName: 'Status',
    width: 70,
  },
  {
    field: 'visit_dt',
    headerName: 'Visit Date',
    type: Date,
    width: 160,
  },
  {
    field: 'technician',
    headerName: 'Technician(s)',
    width: 150,
  },
  {
    field: 'ev_car',
    headerName: 'Ev Car',
    width: 150,
  },
  {
    field: 'cust_cd',
    headerName: 'Cust Code',
    width: 110,
  },
  {
    field: 'bill_to_cust',
    headerName: 'Bill To Cust',
    width: 110,
  },
];
 
//rows => boardList로 대체
//const rows = [
//  { id: 1, ReportNo: 'FR23060002A', Status: 'B', VisitDt: '2023-06-09', Technician: 'EVANS JOLY', EvCar: 'KEV602', CustCd: 'Electrify America' },
//  { id: 2, ReportNo: 'FR23060003A', Status: 'C', VisitDt: '2023-06-20', Technician: 'KYUHYUNG LEE', EvCar: '', CustCd: 'Electrify America' },
//  { id: 3, ReportNo: 'FR23060004A', Status: 'B', VisitDt: '2023-06-20', Technician: 'ERIC PEREZ', EvCar: 'KEV602', CustCd: 'Electrify America' },
//  { id: 4, ReportNo: 'FR23060005A', Status: 'B', VisitDt: '2023-06-05', Technician: 'ERIC PEREZ, EVANS JOLY', EvCar: 'KEV602', CustCd: 'Electrify America' },
//  { id: 5, ReportNo: 'FR23060006A', Status: 'B', VisitDt: '2023-06-06', Technician: 'ERIC', EvCar: 'KEV602', CustCd: 'Electrify America' },
//  { id: 6, ReportNo: 'FR23060007A', Status: 'F', VisitDt: '2023-06-09', Technician: 'EVANS', EvCar: 'KEV602', CustCd: 'Electrify America' },
//  { id: 7, ReportNo: 'FR23060008A', Status: 'F', VisitDt: '2023-06-06', Technician: 'ERIC', EvCar: 'KEV603', CustCd: 'Electrify America' },
//  { id: 8, ReportNo: 'FR23060009A', Status: 'B', VisitDt: '2023-06-05', Technician: 'ERIC, EVANS', EvCar: 'KEV602', CustCd: 'Electrify America' },
//  { id: 9, ReportNo: 'FR23060010A', Status: 'B', VisitDt: '2023-06-07', Technician: 'ERIC PEREZ, EVANS JOLY', EvCar: 'KEV602', CustCd: 'Electrify America' },
//];

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

export default function Board({ boardState, setBoardState }) {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const [reportno, setReportno] = useState(null);
    const reportPath = "/reports/fieldRepair.rdlx-json";

    //Click Report No at the List : move to Tab2(Report Viewer page)
    const viewerRef = React.useRef(null);
    const callViewer = async () => {
        try {
            setValue(1);
            a11yProps(1);
        } catch (err) {console.log(err)}
    };

    const handleCellClick = (
        params,  // GridCellParams<any>
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        if ( params.field === 'reportno'){
            callViewer();
            setReportno(params.value);
        }
    };

    //# Tab1. List Retrieve
    const [boardList, setBoardList] = useState([]);
    const FIELD_REPAIR_LIST_URL = "/api/fieldRepair/select/list";
    const [frDate, setFrDate] = useState(dayjs().add(-1, 'month'));
    const [toDate, setToDate] = useState(dayjs());
    
    const fetchList = async () => { 
      try {
          axios(FIELD_REPAIR_LIST_URL, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials":"true",},
              params: { 
                div: sessionStorage.getItem("div"),
                visit_fr: dayjs(frDate).format('MM/DD/YYYY'),
                visit_to: dayjs(toDate).format('MM/DD/YYYY')
              },
            })
            .then((res) => {
              setBoardList(res.data);
            })
            .catch((e) => {
              console.error(e);
            });
      } catch (err) {
          console.log(err);
      }
    }

    // 화면 처음 렌더링 될 때 호출 되는 함수
    useEffect(() => {
      //로그인 체크 
      if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
        navigate("/login");
      }
      // API를 이용하여 List 조회
      fetchList();
    }, []);

    const exportsSettings = {   
      pdf: {
        printing: "none",
        copying: false,
        modifying: false,
        annotating: false,
        contentAccessibility: false,
        documentAssembly: false,
        pdfVersion: "1.7",
        autoPrint: false,
        filename: reportno,
        title: reportno,
        author: "Teamex",
      },
    };
    //Report Pdf Export 세팅
    function setExportSetting(param) {
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
    // LIST 에서 바로 REPORT EXPORT
    const apiRef = useGridApiRef(null);
    const exportReportByList = async () => {
      if (!apiRef.current) return;
      
      const selectedRows = apiRef.current.getSelectedRows();
      const selectedNo = Array.from(selectedRows.keys());
      
      const arrCount = selectedNo.length;
      
      for (let i=0; i< arrCount; i++){
        //setReportno(selectedNo[i]);
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

    //# TAB2. Report 조회
    
    // REPORT 내보내기 가능 타입
    const availableExports = ["pdf"]; //, "html", "tabular-data"
    // 내보내기 버튼 사이드바로 (상단)
    const panelsLayout = "sidebar";

    useEffect(() => {
      try {
        if (reportno== null) return;
          if (!viewerRef.current) return;
          viewerRef.current.Viewer.toolbar.updateLayout({
            default: ["$navigation","$split","$refresh","$split","$zoom","$split"],
            fullscreen: ["$navigation","$split","$refresh","$split","$zoom","$split"],
		        mobile: ["$navigation","$split","$refresh","$split","$zoom","$split"]
          });
          viewerRef.current.Viewer.open(
            reportPath, {
              ReportParams: [
                  {
                      Name: "reportno",
                      Value: reportno,
                  },
              ],
          });
      } catch(error) {}
    },[reportno]); 

    return (
      <Box sx={{ width: '100%'}}>
        <Box sx={{bgcolor: 'primary.main',
                   boxShadow: 1,
                   borderRadius: 2,
                   p: 2,
                   width: '100%', height: '50px',
        }}>
          <Box sx={{ color: 'white' }}>Field Repair</Box>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="List" {...a11yProps(0)} />
                <Tab label="Report" {...a11yProps(1)} />
            </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Box sx={{ height: '66vh', width: '78vw'}}>
            <Box display="flex" sx={{ m: 1 }}>
              <DatePicker 
                  label="Visit Date From" 
                  format="MM/DD/YYYY"
                  defaultValue={frDate}
                  value={frDate}
                  sx={{ mr: 1}}
                  onChange={setFrDate}
                  slotProps={{ textField: { size: 'small' } }}
              />
              ~ 
              <DatePicker 
                  label="Visit Date To" 
                  format="MM/DD/YYYY" 
                  defaultValue={toDate}
                  value={toDate}
                  sx={{ ml: 1}}
                  onChange={setToDate}
                  slotProps={{ textField: { size: 'small' } }}
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
                density='compact'
                onCellClick={handleCellClick}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                checkboxSelection
                disableRowSelectionOnClick     //ROW 선택 시 체크박스 체크 되지 않도록(체크박스 클릭시만 체크)
                apiRef={apiRef}
            />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} >
          <div id="designer-host" style={{ height: '70vh', width: '100%' }} >
            <Viewer 
              ref={viewerRef} 
              exportsSettings={setExportSetting(reportno)}
              availableExports={availableExports}
              panelsLayout={panelsLayout}
            />
          </div>
        </CustomTabPanel>
      </Box>
    );
}