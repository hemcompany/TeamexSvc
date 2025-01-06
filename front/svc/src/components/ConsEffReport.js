import * as React from 'react';
import { useEffect, useRef, useCallback } from "react";
import dayjs from 'dayjs';

// Reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";

function ConsEffReport(props) {
    //# TAB1. Report Inquiry
    //console.log("ConsEffReport : " + props.search);
    //console.log(props);
    const viewerRef = useRef(null);
    const propFrDate = useRef(null);
    const propToDate = useRef(null);

    //REPORT Setting
    //-- REPORT form path
    const reportPath = "/reports/compareWH.rdlx-json";
    //-- export type setting
    const availableExports = ["pdf"]; //, "html", "tabular-data"
    //-- export button type : sidebar (upper side)
    const panelsLayout = "sidebar";
    //-- Toolbar setting
    const toolbarLayout = {
        default: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        fullscreen: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        mobile: ["$navigation","$split","$refresh","$split","$zoom","$split"]
    };
    //-- PDF export setting
    const setExportSetting = () => {
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
                filename: 'Efficiency of SOW (' + propFrDate + '_' + propToDate + ')',
                title: 'Efficiency of SOW (' + propFrDate + '_' + propToDate + ')',
                author: "Teamex",
            },
        };
    };

    // Report viewer Inquiry (call Backend API)
    const fetchViewer = useCallback(async () => { 
        try {
            if (!viewerRef.current) return;
            const viewer = viewerRef.current;
            if (viewer) {
                viewer.open(
                    reportPath, {
                        ReportParams: [
                            { Name: "div", Value: sessionStorage.getItem("div") },
                            { Name: "user_id", Value: sessionStorage.getItem("id"), },
                            { Name: "date_fr", Value: propFrDate.current,},
                            { Name: "date_to", Value: propToDate.current, },
                        ],
                });
            }
            return () => {
                if (viewer && viewer.dispose === "function") viewer.dispose(); // clear resources
            };
        } catch (err) {
            console.log(err);
            alert(err);
        }
    },[]);

    // Function called when the search button clicked
    useEffect(() => {
        //console.log("ConsEffReport : effect");
        // Inquiry period setting (get from the parent prop)
        propFrDate.current = dayjs(props.frDate.current).format('MM/DD/YYYY');
        propToDate.current = dayjs(props.toDate.current).format('MM/DD/YYYY');
        // Call Report inquiry function
        fetchViewer();

    },[props.search]); 

    return(
        <div id="designer-host" style={{ height: '70vh', width: '100%' }} >
            <Viewer 
                ref={viewerRef}
                availableExports={availableExports}
                toolbarLayout={toolbarLayout}
                panelsLayout={panelsLayout}
                exportsSettings={setExportSetting()}
            />
        </div>
    );
}

export default ConsEffReport;
