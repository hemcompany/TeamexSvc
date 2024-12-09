import * as React from 'react';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import useDidMountEffect from '../utils/useDidMountEffect';

// Reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";

function ConsEffReport({frDate, toDate, search}) {
    //# TAB1. Report 조회
    //REPORT 양식 PATH
    const reportPath = "/reports/compareWH.rdlx-json";   
    // REPORT 내보내기 가능 타입
    const availableExports = ["pdf"]; //, "html", "tabular-data"
    // 내보내기 버튼 사이드바로 (상단)
    const panelsLayout = "sidebar";
    const toolbarLayout = {
        default: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        fullscreen: ["$navigation","$split","$refresh","$split","$zoom","$split"],
        mobile: ["$navigation","$split","$refresh","$split","$zoom","$split"]
    };

    const viewerRef = React.useRef(null);

    //Report Viewer 조회
    useEffect(() => {
        try {
            if (frDate== null) return;
            if (!viewerRef.current) return;
            viewerRef.current.Viewer.open(
                reportPath, {
                    ReportParams: [
                        { Name: "div", Value: sessionStorage.getItem("div") },
                        { Name: "date_fr", Value: dayjs(frDate).format('MM/DD/YYYY'),},
                        { Name: "date_to", Value: dayjs(toDate).format('MM/DD/YYYY'), },
                    ],
            });
        } catch(error) {}
    },[search]); 

    //Report Pdf Export 세팅
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
                filename: 'Efficiency of SOW (' + frDate + '_' + toDate + ')',
                title: 'Efficiency of SOW (' + frDate + '_' + toDate + ')',
                author: "Teamex",
            },
        };
    };

    return(
        
        <div id="designer-host" style={{ height: '70vh', width: '100%' }} >
            <Viewer 
                ref={viewerRef}
                availableExports={availableExports}
                panelsLayout={panelsLayout}
                toolbarLayout={toolbarLayout}
                exportsSettings={setExportSetting()}
            />
        </div>
    );
} 

export default ConsEffReport;
