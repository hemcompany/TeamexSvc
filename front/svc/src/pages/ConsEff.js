import * as React from 'react';
import { useEffect, useState, useRef } from "react";
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
    //console.log("ConsEff");
    //TAB Start ==========================================================
    const [value, setValue] = useState(0);  //Tab Index state
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
    // Tab End  ============================================================
    
    const navigate = useNavigate();
    //Inquiry period setting
    const frDate = useRef(dayjs().add(-1,'month').startOf('month'));
    const toDate = useRef(dayjs().add(-1,'month').endOf('month'));
    const [search, setSearch] = useState(0); //Search Button state

    //Report / Grid inquiry
    const fetchList = () => {
        setSearch(search +1);
    };
    
    // function called when the window first rendering
    useEffect(() => {
        //console.log("ConsEff : useEffect");
        //Login Check
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
    }, []);
    
    return (
      <Box sx={{ width: '100%'}}>
        <Box sx={{ display: 'flex', m: 1, mt: 2}}>
            <DatePicker 
                label="Visit Date From" 
                format="MM/DD/YYYY"
                defaultValue={frDate.current}
                onChange={(newValue) => {frDate.current = newValue;}}
                sx={{ mr: 1}}
                slotProps={{ textField: { size: 'small', inputRef: frDate.current } }}
            />
            ~ 
            <DatePicker 
                label="Visit Date To" 
                format="MM/DD/YYYY"
                defaultValue={toDate.current}
                onChange={(newValue) => {toDate.current = newValue;}}
                sx={{ ml: 1}}
                slotProps={{ textField: { size: 'small', inputRef: toDate.current } }}
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