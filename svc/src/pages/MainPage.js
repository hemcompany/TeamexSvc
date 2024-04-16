import * as React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuBar from "../components/MenuBar";
import FieldRepair from "../pages/FieldRepair";
import { useMenuContext } from "../provider/MenuProvider";
import { useEffect } from "react";
import User from "../components/User";

function MainPage() {
    const {menu} = useMenuContext();
    useEffect(() => {

    }, [menu]);

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <MenuBar />
                <Box component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}>
                    {
                        MenuRender(menu)
                    }
                </Box>
            </Box>
        </>
    );
}

const MenuRender = (menu) => {
    switch (menu){
        case "FIELDREPAIR":
            return <FieldRepair/>
        case "USER":
            return <User/>
        default:
            return <FieldRepair/>
    }
}

export default MainPage;