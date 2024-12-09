import * as React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMenuContext } from "../provider/MenuProvider";
import MenuBar from "../components/MenuBar";
import TopMenu from "../components/TopMenu";

function MainPage() {
    const windowName = useMenuContext().windowName;
    const [ScreenComponent, setScreenComponent] = useState(null);
    const navigate = useNavigate();
    const ChangeComponent = () => {
        return ScreenComponent? <ScreenComponent /> : <div>Loading...</div>;
    };

    useEffect(() => {
        //console.log("Main 1 ");
        //Check login
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
            navigate("/login");
            return;
        }
    }, []);
    
    useEffect(() => {
        //console.log("Main 2 " + windowName);
        if (windowName) {
            import( `./${windowName}`)
                .then((module) => setScreenComponent(() => module.default))
                .catch((err) => {
                    console.error('Error loading screen', err);
                    setScreenComponent(()=>()=><></>);
                });
        }
    }, [windowName]);
    
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <MenuBar />
                <Box component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}>
                    <TopMenu />
                    <ChangeComponent />
                </Box>
            </Box>
        </> 
    );
}

export default MainPage;