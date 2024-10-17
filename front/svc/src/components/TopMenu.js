import * as React from 'react';
import Box from '@mui/material/Box';
import { useMenuContext } from "../provider/MenuProvider";
import { useEffect } from "react";

function TopMenu() {
    const {menu} = useMenuContext();
    useEffect(() => {

    }, [menu]);

    return (
        <>
        <Box sx={{
                backgroundColor: (theme) => 
                    theme.palette.mode === "dark"? "#002984" : "primary.main",
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                width: '100%', height: '50px',
            }}
        >
            <Box sx={{ color: 'white' }}>{MenuRender(menu)}</Box>
        </Box>
        </>
    );
}

const MenuRender = (menu) => {
    switch (menu){
        case "FIELDREPAIR":
            return "Field Repair";
        case "EVALUATION":
            return "Evaluation";
        case "EVALREPORT":
            return "Evaluation Report";
        case "ALLOWANCE":
                return "Allowance Status";
        case "ALLOWANCEM":
            return "Allowance Status (Monthly)";
        case "LOGISTICSS":
            return "Order and Delivery Status";
        case "CONSEVC":
            return "EVC Consolidated Report";
        default:
            return "Login";
    }
}

export default TopMenu;