import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import axios from 'axios';
import TopMenu from '../components/TopMenu.js';
import EvaluationForm from '../components/EvaluationForm.js';
// MUI
import { Box, Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const columns = [
    {
        field: 'reportno', 
        headerName: 'Report NO.', 
        width: 115,
    },
    {
        field: 'fs_no', 
        headerName: 'FS NO.', 
        width: 115,
    },
    {
        field: 'report_sts',
        headerName: 'Status',
        width: 55,
        align: 'center',
    },
    {
        field: 'ev_e',
        headerName: 'Engineer',
        type: 'boolean',
        width: 75,
    },
    {
        field: 'ev_o',
        headerName: 'Operator',
        type: 'boolean',
        width: 75,
    },
    {
        field: 'ev_p',
        headerName: 'Parts M.',
        type: 'boolean',
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
        field: 'create_id',
        headerName: 'Create Id',
        width: 80,
    },
    {
        field: 'cust_cd',
        headerName: 'Cust Code',
        width: 150,
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

export default function Evaluation() {
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    //# Report List
    const [boardList, setBoardList] = useState([]);     //평가대상 REPORT LIST 정보
    const [reportinfo, setReportinfo] = useState([]);   //평가위해 선택된 REPORT 정보
    
    const EVALUATION_LIST_URL = "/api/evaluation/select/list";
    const [frDate, setFrDate] = useState(dayjs().add(-1, 'month'));
    const [toDate, setToDate] = useState(dayjs());
    const PAGE_SIZE = 25;
    
    // Report List Retrieve (call Backend API)
    const fetchList = async () => { 
        try {
            axios(EVALUATION_LIST_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8", 
                    "Accept": "application/json",
                    "Access-Control-Allow-Credentials":"true",},
                params: { 
                    div: sessionStorage.getItem("div"),
                    user_id: sessionStorage.getItem("id"),
                    user_type: sessionStorage.getItem("type"),
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

    //LIST에서 ROW 클릭 : REPORT INFO 세팅
    const handleRowClick = (
        params,  // GridCellParams<any>
        event,   // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {
        if(params.row.reportno==="" || params.row.reportno===null) return;
        setReportinfo({
            div: sessionStorage.getItem("div"),
            reportno: params.row.reportno,
            user_id: sessionStorage.getItem("id"),
            user_type: sessionStorage.getItem("type"),
        });
    };

    // 화면 처음 렌더링 될 때 호출 되는 함수
    useEffect(() => {
        //로그인 체크 
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
        // API를 이용하여 평가대상 Report List 조회
        fetchList();
    }, []);

    // Report List 조회 완료 시 호출 되는 함수 : 첫번째 혹은 이전에 선택한 reportno 평가정보 조회
    useEffect(() => {
        var reportno= "";
        if (reportinfo.reportno && reportinfo.reportno !== "") {
            reportno = reportinfo.reportno;
        } else {
            if (boardList.length > 0 ) {
                reportno = boardList[0].reportno;
            }
        }
        if (!reportno) return;
        setReportinfo({
            div: sessionStorage.getItem("div"),
            reportno: reportno,
            user_id: sessionStorage.getItem("id"),
            user_type: sessionStorage.getItem("type"),
        });
    }, [boardList]);

    return (
        <Box sx={{ width: '100%' }}>
            
            <TopMenu />

            <Box sx={{ height: '76vh', width: '78vw', mt: 2 }}>
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
                </Box>
                
                <Box sx={{ display: 'flex', 
                            minWidth: '400px',
                            height: '76vh', width: '77vw'}}>
                    <Box sx={{ width: 400 }}>
                        <DataGrid
                            rows={boardList}
                            columns={columns}
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            density='compact'
                            onRowClick={handleRowClick}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[PAGE_SIZE]}
                        />
                    </Box>

                    <Box sx={{ display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                ml: 1,
                                width: '40vw',
                                height: '76vh',
                                minWidth: 400,
                            }, }}
                    >
                        <EvaluationForm reportinfo={reportinfo} fetchList={fetchList} />
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}