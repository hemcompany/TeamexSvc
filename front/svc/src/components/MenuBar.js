import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {useMenuContext} from "../provider/MenuProvider";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom"
import logo from '../assets/logo.png';

const drawerWidth = 220;
export default function MenuBar() {
    const {menu, setMenu} = useMenuContext();
    const navigate = useNavigate();
    const ChangeMenu = (menuName) => {
        setMenu(menuName);
    }
    const handleLogout = () => {
    	sessionStorage.removeItem("div");
    	sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
    	sessionStorage.removeItem("team");
    	navigate("/login");
  	};
    return (
        <>

            <Drawer 
                sx={{
                    width: drawerWidth, 
                    flexShrink: 0, 
                    '& .MuiDrawer-paper': {
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                    <img src={logo} alt="Logo" />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" padding={0.5}>
                    <Typography variant='h7'>{sessionStorage.getItem("name")}</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" padding={0.5}>
                    <Typography variant='h7'>Teamex Field Report</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => ChangeMenu('FIELDREPAIR')}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Field Repair" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => ChangeMenu('EVALUATION')}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Evaluation" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleLogout() }>
                            <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="LogOut" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}