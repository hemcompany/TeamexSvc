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


function Allowance() {
    const navigate = useNavigate();
    const viewerRef = React.useRef(null);

    const reportPath = "/reports/allowance.rdlx-json";   //REPORT form PATH
    const [frDate, setFrDate] = useState(dayjs().add(-1, 'month'));
    const [toDate, setToDate] = useState(dayjs());
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
                    {Name: "start_dt",Value: dayjs(frDate).format('MM/DD/YYYY'),},
                    {Name: "end_dt",Value: dayjs(toDate).format('MM/DD/YYYY'),},
                ],
            });
        } catch(error) {}
    }
    // REPORT EXPORT by Button
    const exportReport = async () => {
        if (!viewerRef.current) return;
            
        viewerRef.current.Viewer.export('pdf', setExportSetting("Allowance"), {cancel: cancelCallback })
            .then(result => result.download('Allowance'));
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
                  label="Work Date From" 
                  format="MM/DD/YYYY"
                  defaultValue={frDate}
                  value={frDate}
                  sx={{ mr: 1}}
                  onChange={setFrDate}
                  slotProps={{ textField: { size: 'small' } }}
              />
              ~ 
              <DatePicker 
                  label="Work Date To" 
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
                    viewReport();
                }}>Search
              </Button>
            </Box>
            <Box>
              <div id="designer-host" style={{ height: '75vh', width: '100%' }} >
                <Viewer 
                ref={viewerRef}
                exportsSettings={setExportSetting("Allowance")}
                availableExports={availableExports}
                panelsLayout={panelsLayout}
                toolbarLayout={toolbarLayout}
                />
            </div>
            </Box>
        </Box>
    );
}

export default Allowance;