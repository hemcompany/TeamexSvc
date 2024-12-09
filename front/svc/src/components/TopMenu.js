import * as React from 'react';
import Box from '@mui/material/Box';
import { useMenuContext } from "../provider/MenuProvider";
import { useEffect } from "react";

function TopMenu() {
    const menuName = useMenuContext().menuName;
    useEffect(() => {
        //console.log("Top1")
    }, [menuName]);

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
            <Box sx={{ color: 'white' }}>{menuName}</Box>
        </Box>
        </>
    );
}

export default TopMenu;