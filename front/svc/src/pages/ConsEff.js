import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// MUI
import { Box, Button, Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ConsEffReport from  '../components/ConsEffReport';
import ConsEffGrid from  '../components/ConsEffGrid';

export default function ConsEff() {
    const navigate = useNavigate();

    //TAB
    const [value, setValue] = useState(0);  //Tab Index값 저장
    const [search, setSearch] = useState(0); //조회버튼
    const handleChange = (event, newValue) => {
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
                    <Container  sx={{ p: 1}}>
                        <Box>{children}</Box>
                    </Container>
                )}
            </div>
        );
    };

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
    };
    //선택된 조회기간 저장
    const [frDate, setFrDate] = useState(dayjs().add(-1,'month').startOf('month'));
    const [toDate, setToDate] = useState(dayjs().add(-1,'month').endOf('month'));
    
    //Report / Grid 조회
    const fetchList = () => { 
        // Eff of SOW Report 조회
        setSearch(search +1);
    };

    // 화면 처음 렌더링 될 때 호출 되는 함수
    useEffect(() => {
        //로그인 체크 
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
        return;
        }
        // Report/Grid 조회
        fetchList();
    }, []);
    
    return (
      <Box sx={{ width: '100%'}}>
        <Box sx={{ display: 'flex', m: 1, mt: 2}}>
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

        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Eff of SOW" {...a11yProps(0)} />
                <Tab label="Visit Data" {...a11yProps(1)} />
            </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
            <Box sx={{ height: '68vh', width: '77vw'}}>
                <ConsEffReport frDate={frDate} toDate={toDate} search={search} />
            </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <Box sx={{ height: '68vh', width: '77vw'}}>
                <ConsEffGrid frDate={frDate} toDate={toDate} search={search} />
            </Box>
        </CustomTabPanel>
      </Box>
    );
}