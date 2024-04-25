import * as React from 'react';
import { Box, Button, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import axios from 'axios';
//reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

//TAB
function CustomTabPanel(props) { 
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
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
    width: 80,
  },
  {
    field: 'visit_dt',
    headerName: 'Visit Date',
    type: Date,
    width: 150,
  },
  {
    field: 'technician',
    headerName: 'Technician(s)',
    width: 150,
  },
  {
    field: 'ev_car',
    headerName: 'Ev Car',
    width: 110,
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
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'outlined' },
          }}
        />
      </GridToolbarContainer>
    );
}

export default function Board({ boardState, setBoardState }) {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    //Click Report No : move to Tab2(Report page)
    const [reportno, setReportno] = useState(null);
    const viewerRef = React.useRef(null);
    const callViewer = async () => {
        try {
            setValue(1);
            a11yProps(1);
        } catch (err) {console.log(err)}
    };

    const handleEvent: GridEventListener<'cellClick'> = (
        params,  // GridCellParams<any>
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        if ( params.field == 'reportno'){
            callViewer();
            setReportno(params.value);
        }
    };

    //List 조회
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
                div: "80",     // 로그인단 구현 후 로그인 div에서 가져오기
                visit_fr: dayjs(frDate).format('YYYY-MM-DD'),
                visit_to: dayjs(toDate).format('YYYY-MM-DD')
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

    useEffect(() => {
      //setFrDate(dayjs().add(-1, 'month')); //조회 조건 visit dt from 1달전 오늘날짜 세팅
      //setToDate(dayjs()); //조회 조건 visit dt to 오늘날짜 세팅
      // API를 이용하여 조회
      fetchList();
    }, []);

    //Report 조회
    useEffect(() => {
        try {
          if (reportno== null) return;
            viewerRef.current.Viewer.open(
            "/reports/fieldRepair.rdlx-json", {
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
          <div style={{ height: '67vh', width: '100%' }}>
            <Box display="flex" sx={{ m: 1 }}>
              <DatePicker 
                  label="Visit Date From" 
                  format="YYYY-MM-DD"
                  defaultValue={frDate}
                  value={frDate}
                  sx={{ mr: 1}}
                  onChange={setFrDate}
                  slotProps={{ textField: { size: 'small' } }}
              />
              ~ 
              <DatePicker 
                  label="Visit Date To" 
                  format="YYYY-MM-DD" 
                  defaultValue={toDate}
                  value={toDate}
                  sx={{ ml: 1}}
                  onChange={setToDate}
                  slotProps={{ textField: { size: 'small' } }}
              />
              <Button 
                  variant="outlined" 
                  size="middle"
                  sx={{ ml: 1}}
                  onClick={() => {
                    fetchList();
                  }}>Search
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
                sx={{ '--DataGrid-overlayHeight': '300px' }}
                onCellClick={handleEvent}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                checkboxSelection
                disableRowSelectionOnClick
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} >
          <div id="designer-host" style={{ height: '70vh', width: '100%' }} >
            <Viewer ref={viewerRef} />
          </div>
        </CustomTabPanel>
      </Box>
    );
}