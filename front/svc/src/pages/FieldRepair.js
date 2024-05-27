import * as React from 'react';
import { useEffect, useState } from "react";
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
// Reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";
import { Core, PdfExport } from "@grapecity/activereports";

//TAB1 - DATA GRID 세팅
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
    width: 100,
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

export default function Board() {
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    //TAB
    const [value, setValue] = useState(0);  //Tab Index값 저장
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
      if(index == 0){
        if (apiRef.current === null) {
          apiRef.current = {};
        }
      }
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    const [reportno, setReportno] = useState(null);   //선택된 REPORTNO 저장
    const reportPath = "/reports/fieldRepair.rdlx-json";   //REPORT 양식 PATH
    const apiRef = useGridApiRef();

    //# Tab1. List
    const [boardList, setBoardList] = useState([]);
    const FIELD_REPAIR_LIST_URL = "/api/fieldRepair/select/list";
    const [frDate, setFrDate] = useState(dayjs().add(-1, 'month'));
    const [toDate, setToDate] = useState(dayjs());
    
    // List Retrieve (call Backend API)
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
              alert(e);
            });
      } catch (err) {
          console.log(err);
          alert(err);
      }
    }

    //LIST에서 REPORT NO 클릭 : Tab2로 이동해서 REPORT 출력
    const viewerRef = React.useRef(null);
    const handleCellClick = (
        params,  // GridCellParams<any>
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
      event.preventDefault();
      if ( params.field === 'reportno'){
            setReportno(params.value);
            setValue(1);
      }
    };
    // 화면 처음 렌더링 될 때 호출 되는 함수
    useEffect(() => {
      //로그인 체크 
      if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
        navigate("/login");
        return;
      }
      // API를 이용하여 List 조회
      fetchList();
    }, []);

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
    const exportReportByList = async () => {
      if (apiRef.current === null) {
        apiRef.current = {};
      }
      const selectedRows = apiRef.current.getSelectedRows();
      const selectedNo = Array.from(selectedRows.keys());
      const arrCount = selectedNo.length;
      for (let i=0; i< arrCount; i++){
        setReportno(selectedNo[i]);
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
    const toolbarLayout = {
      default: ["$navigation","$split","$refresh","$split","$zoom","$split"],
      fullscreen: ["$navigation","$split","$refresh","$split","$zoom","$split"],
      mobile: ["$navigation","$split","$refresh","$split","$zoom","$split"]
    };

    //Report Viewer 조회
    useEffect(() => {
      try {
        if (reportno== null) return;
          if (!viewerRef.current) return;
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
    }); 

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
          <Box sx={{ height: '68vh', width: '77vw'}}>
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
              toolbarLayout={toolbarLayout}
            />
          </div>
        </CustomTabPanel>
      </Box>
    );
}