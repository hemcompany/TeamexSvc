import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import TopMenu from '../components/TopMenu.js';
// MUI
import { Box, Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// Reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";


function AllowanceM() {
    const navigate = useNavigate();
    const viewerRef = React.useRef(null);

    const reportPath = "/reports/allowanceM.rdlx-json";   //REPORT form PATH
    const [wYearMon, setWYearMon] = useState(dayjs());
    // REPORT Export type
    const availableExports = ["pdf"]; //, "html", "tabular-data"
    // Export Button position : Top
    const panelsLayout = "sidebar";
    const toolbarLayout = {
        default: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        fullscreen: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        mobile: ["$navigation","$split","$refresh","$split","$zoom","$split"]
    };

    //Report Pdf Export Setting
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

    //Retrieve Report Viewer
    const viewReport = () => {
        try {
            if (!viewerRef.current) return;
            viewerRef.current.Viewer.open(
                reportPath, {
                ReportParams: [
                    {Name: "div",Value: sessionStorage.getItem("div"),},
                    {Name: "user_type",Value: sessionStorage.getItem("type"),},
                    {Name: "user_id",Value: sessionStorage.getItem("id"),},
                    {Name: "w_year",Value: dayjs(wYearMon).format('YYYY'),},
                    {Name: "w_month",Value: dayjs(wYearMon).format('MM'),},
                ],
            });
        } catch(error) {}
    }
    // REPORT EXPORT by Button
    const exportReport = async () => {
        if (!viewerRef.current) return;
            
        viewerRef.current.Viewer.export('pdf', setExportSetting("Allowance(Monthly)"), {cancel: cancelCallback })
            .then(result => result.download('Allowance(Monthly)'));
    }
    var cancelCallback = function(){
        return false; // continue export. Return true to cancel export process
    }
    useEffect(() => {
        //Check login
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
        // Retrieve List by API
        viewReport();
    }, []);
    
    return (
        <Box sx={{ width: '100%' }}>
            <TopMenu />
            <Box display="flex" sx={{ m: 1, mt: 2 }}>
                <DatePicker 
                    label="Work Month"
                    views={['month', 'year']}
                    defaultValue={wYearMon}
                    value={wYearMon}
                    sx={{ mr: 1}}
                    onChange={setWYearMon}
                    slotProps={{ textField: { size: 'small' } }}
                />
              <Button 
                variant="outlined" 
                size="small"
                sx={{ ml: 1}}
                startIcon={<SearchOutlinedIcon />}
                onClick={() => {
                    viewReport();
                }}>Search
              </Button>
            </Box>
            <Box>
              <div id="designer-host" style={{ height: '75vh', width: '100%' }} >
                <Viewer 
                ref={viewerRef}
                exportsSettings={setExportSetting("Allowance(Monthly)")}
                availableExports={availableExports}
                panelsLayout={panelsLayout}
                toolbarLayout={toolbarLayout}
                />
            </div>
            </Box>
        </Box>
    );
}

export default AllowanceM;