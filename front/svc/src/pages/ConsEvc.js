import * as React from 'react';
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import axios from 'axios';
import TopMenu from '../components/TopMenu.js';
// MUI
import { Box, Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//DATA GRID 세팅
const columns = [
  { field: 'cpo', headerName: 'CPO', width: 50, align: 'center', },
  { field: 'case_fiscal_period', headerName: 'Case Fiscal Period', width: 140, align: 'center', },
  { field: 'case_transaction_date', headerName: 'Case Transaction Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'case_number', headerName: 'Case Number', width: 130, },
  { field: 'case_status', headerName: 'Case Status', width: 100, align: 'center', },
  { field: 'site_cd', headerName: 'Site CD.', width: 100, },
  { field: 'station_id', headerName: 'Station ID', width: 130, },
  { field: 'case_sequence', headerName: 'Case Seq.', width: 90, type: Number, align: 'right', },
  { field: 'product_cd', headerName: 'Product CD.', width: 110, },
  { field: 'model_no', headerName: 'Model No.', width: 150, },
  { field: 'gen_type', headerName: 'Gen Type', width: 130, },
  { field: 'site_name', headerName: 'Site Name', width: 150, },
  { field: 'address', headerName: 'Adress', width: 150, },
  { field: 'city', headerName: 'City', width: 120, },
  { field: 'state_cd', headerName: 'State CD.', width: 80, align: 'center', },
  { field: 'zip_cd', headerName: 'ZIP CD.', width: 80, align: 'center', },
  { field: 'country_cd', headerName: 'Country CD.', width: 100, align: 'center', },
  { field: 'teamex_coverage', headerName: 'Teamex Coverage', width: 110, align: 'center', },
  { field: 'commissioned_date', headerName: 'Commissioned Date', width: 150, type: 'date', valueGetter: (value) => value && new Date(value), },
  { field: 'station_aging', headerName: 'Station Aging', width: 110, type: Number, align: 'right', },
  { field: 'elam_no', headerName: 'Elam No.', width: 100, type: 'string', },
  { field: 'work_type', headerName: 'Work Type', width: 90, },
  { field: 'case_date', headerName: 'Case Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'case_month', headerName: 'Case Month', width: 100, align: 'center', },
  { field: 'case_year', headerName: 'Case Year', width: 90, align: 'center', },
  { field: 'issuedby', headerName: 'Issued By', width: 150, },
  { field: 'create_id', headerName: 'Create ID', width: 80, },
  { field: 'creator', headerName: 'Creator', width: 150, },
  { field: 'create_date', headerName: 'Create Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'update_id', headerName: 'Update ID', width: 90, },
  { field: 'update_date', headerName: 'Update Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'response_date', headerName: 'Response Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'confirm_id', headerName: 'Confirm ID', width: 100, },
  { field: 'confirm_date', headerName: 'Confirm Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'warranty_yn', headerName: 'Warranty', width: 80, },
  { field: 'cycle', headerName: 'Cycle', width: 60, },
  { field: 'priority', headerName: 'Priority', width: 70, align: 'center', },
  { field: 'symptom', headerName: 'Symptom', width: 200, },
  { field: 'teamviewer', headerName: 'Teamviewer', width: 200, },
  { field: 'exp_reason', headerName: 'Exp Reason', width: 100, },
  { field: 'instruction', headerName: 'Instruction', width: 200, },
  { field: 'close_fg', headerName: 'Close Flag', width: 90, align: 'center', },
  { field: 'exp_reason_cd', headerName: 'Exp Reason Code', width: 140, },
  { field: 'visit_dt', headerName: 'Visit Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'work_done', headerName: 'Work Done', width: 300, },
  { field: 'use_part1', headerName: 'Use Part1', width: 130, },
  { field: 'use_part1_qty', headerName: 'Use Part1 Qty', width: 110, type: Number, align: 'right', },
  { field: 'use_part2', headerName: 'Use Part2', width: 130, },
  { field: 'use_part2_qty', headerName: 'Use Part2 Qty', width: 110, type: Number, align: 'right', },
  { field: 'use_part3', headerName: 'Use Part3', width: 130, },
  { field: 'use_part3_qty', headerName: 'Use Part3 Qty', width: 110, type: Number, align: 'right', },
  { field: 'symptom_cd', headerName: 'Symptom Code', width: 120, },
  { field: 'repair_cd', headerName: 'Repair Code', width: 100, },
  { field: 'warranty_cd', headerName: 'Warranty Code', width: 120, align: 'center', },
  { field: 'visit_yn', headerName: 'Visit Y/N', width: 80, align: 'center', },
  { field: 'tech_company', headerName: 'Tech Company', width: 120, },
  { field: 'phone', headerName: 'Phone', width: 100, },
  { field: 'support', headerName: 'Support', width: 100, },
  { field: 'pending_issue', headerName: 'Pending Issue', width: 200, },
  { field: 'root_cause', headerName: 'Root Cause', width: 200, },
  { field: 'rtat', headerName: 'RTAT', width: 100, },
  { field: 'fs_no', headerName: 'FS No.', width: 130, },
  { field: 'work_order_type', headerName: 'Work Order Type', width: 130, },
  { field: 'fs_status', headerName: 'FS Status', width: 90, align: 'center', },
  { field: 'fs_creation_date', headerName: 'Fs Creation Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'fs_fiscal_period', headerName: 'Fs Fiscal Period', width: 130, align: 'center', },
  { field: 'client_cd', headerName: 'Client CD.', width: 90, },
  { field: 'cust_cd', headerName: 'Customer CD.', width: 110, },
  { field: 'work_order', headerName: 'Work Order', width: 100, },
  { field: 'plan_date', headerName: 'Plan Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'dispatch_date', headerName: 'Dispatch Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'technician', headerName: 'Technician', width: 180, },
  { field: 'tech_count', headerName: 'Tech Count', width: 90, type: Number, align: 'right', },
  { field: 'car1_id', headerName: 'Car1 ID', width: 100, },
  { field: 'car2_id', headerName: 'Car2 ID', width: 100, },
  { field: 'fr_no', headerName: 'FR No.', width: 120, },
  { field: 'fr_status', headerName: 'FR Status', width: 90, align: 'center', },
  { field: 'tran_date', headerName: 'Tran Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'ev_car', headerName: 'EV Car', width: 100, },
  { field: 'bill_to_cust', headerName: 'Bill To Cust', width: 120, },
  { field: 'state', headerName: 'State', width: 70, align: 'center', },
  { field: 'zip', headerName: 'Zip', width: 70, },
  { field: 'total_workhour', headerName: 'Total Work Hour', width: 120, type: Number, align: 'right', },
  { field: 'workhour_range', headerName: 'Workhour Range', width: 130, },
  { field: 'check_in_1', headerName: 'Check-in 1', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_out_1', headerName: 'Check-out 1', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_in_2', headerName: 'Check-in 2', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_out_2', headerName: 'Check-out 2', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_in_3', headerName: 'Check-in 3', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_out_3', headerName: 'Check-out 3', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_in_4', headerName: 'Check-in 4', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_out_4', headerName: 'Check-out 4', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_in_5', headerName: 'Check-in 5', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'check_out_5', headerName: 'Check-out 5', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'hotel_amt', headerName: 'Hotel Amt.', width: 90, type: Number, align: 'right', },
  { field: 'mileage', headerName: 'Mileage', width: 80, type: Number, align: 'right', },
  { field: 'rental_amt', headerName: 'Rental Amt.', width: 100, type: Number, align: 'right', },
  { field: 'others_amt', headerName: 'Others Amt.', width: 100, type: Number, align: 'right', },
  { field: 'billing_fiscal_period', headerName: 'Billing Fiscal Period', width: 150, align: 'center', },
  { field: 'create_dt', headerName: 'Create Date', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'cust_name', headerName: 'Customer Name', width: 150, },
  { field: 'client_name', headerName: 'Client Name', width: 150, },
  { field: 'date_from', headerName: 'Date From', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'date_to', headerName: 'Date To', width: 180, type: 'dateTime', valueGetter: (value) => value && new Date(value), },
  { field: 'total_mileage_fee', headerName: 'Total Mileage Fee', width: 140, type: Number, align: 'right', },
  { field: 'total_labor_fee', headerName: 'Total Labor Fee', width: 130, type: Number, align: 'right', },
  { field: 'total_hotel_fee', headerName: 'Total Hotel Fee', width: 130, type: Number, align: 'right', },
  { field: 'total_rental', headerName: 'Total Rental', width: 110, type: Number, align: 'right', },
  { field: 'others', headerName: 'Others', width: 80, type: Number, align: 'right', },
  { field: 'total_others', headerName: 'Total Others', width: 110, type: Number, align: 'right', },
];

const getFilteredRows = ({ apiRef }) => gridExpandedSortedRowIdsSelector(apiRef);

function CustomToolbar() {
    const apiRef = useGridApiContext();
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
            fileName: 'EVC Consolidation Report',
          })}
        >
          Export Filtered rows
        </Button>
      </GridToolbarContainer>
    );
}

export default function Board() {
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    //# List
    const [boardList, setBoardList] = useState([]);
    const LOGISTICS_STATUS_LIST_URL = "/api/consolidation/select/r_evc";
    const [frDate, setFrDate] = useState(dayjs().add(-1, 'month'));
    const [toDate, setToDate] = useState(dayjs());
    const [loadingYn, setLoadingYn] = useState(false);
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedRows = useMemo(() => boardList, [boardList]);

    // List Retrieve (call Backend API)
    const fetchList = async () => { 
      try {
          setLoadingYn(true);
          axios(LOGISTICS_STATUS_LIST_URL, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json;charset=UTF-8", 
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials":"true",},
              params: { 
                div: sessionStorage.getItem("div"),
                user_type: sessionStorage.getItem("type"),
                date_fr: dayjs(frDate).format('MM/DD/YYYY'),
                date_to: dayjs(toDate).format('MM/DD/YYYY')
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
    }

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

    return (
        <Box sx={{ width: '100%' }}>
            <TopMenu />
            <Box sx={{ display: 'flex', m: 1, mt: 2}}>
                <DatePicker 
                label="Case Transaction Date From" 
                format="MM/DD/YYYY"
                defaultValue={frDate}
                value={frDate}
                sx={{ mr: 1}}
                onChange={setFrDate}
                slotProps={{ textField: { size: 'small' } }}
                />
                ~ 
                <DatePicker 
                label="To" 
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
            <Box sx={{ height: '77vh', width: '78vw', m: 1, mt: 2}}>
                <DataGrid
                    rows={memoizedRows}
                    columns={memoizedColumns}
                    initialState={{
                      pagination: {
                          paginationModel: {
                          pageSize: 5,
                          },
                      },
                    }}
                    slotProps={{
                      loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'linear-progress',
                      },
                    }}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    loading={loadingYn}
                    density='compact'
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    columnBufferPx={100}
                />
            </Box>
        </Box>
    );
}