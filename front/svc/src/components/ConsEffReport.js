import * as React from 'react';
import { useEffect, useRef, useCallback } from "react";
import dayjs from 'dayjs';

// Reporting tool : ActiveReportsJs viewer
import { Viewer } from "@grapecity/activereports-react";

function ConsEffReport(props) {
    //console.log("ConsEffReport : " + props.search);
    //console.log(props);
    const viewerRef = useRef(null);
    const propFrDate = useRef(null);
    const propToDate = useRef(null);

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
                filename: 'Efficiency of SOW (' + propFrDate + '_' + propToDate + ')',
                title: 'Efficiency of SOW (' + propFrDate + '_' + propToDate + ')',
                author: "Teamex",
            },
        };
    };

    // Report viewer Retrieve (call Backend API)
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
                if (viewer && viewer.dispose === "function") viewer.dispose(); // 리소스 정리
            };
        } catch (err) {
            console.log(err);
            alert(err);
        }
    },[]);

    //Report Viewer 조회
    useEffect(() => {
        //console.log("ConsEffReport : effect");
        propFrDate.current = dayjs(props.frDate.current).format('MM/DD/YYYY');
        propToDate.current = dayjs(props.toDate.current).format('MM/DD/YYYY');
        
        // Report 조회
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
