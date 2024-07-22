import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useMenuContext} from "../provider/MenuProvider";
import logo from '../assets/logo.png';
// MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Remove from '@mui/icons-material/Remove';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 220;
export default function MenuBar() {
    const {menu, setMenu} = useMenuContext();
    const [open, setOpen] = useState(true);

    const navigate = useNavigate();
    const ChangeMenu = (menuName) => {
        setMenu(menuName);
    };
    const Expand = () => {
        setOpen(!open);
    };
    const handleLogout = () => {
    	sessionStorage.removeItem("div");
    	sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
    	sessionStorage.removeItem("type");
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
                <List sx={{bgcolor: 'background.paper'}}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => ChangeMenu('FIELDREPAIR')}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Field Repair" />
                        </ListItemButton>
                    </ListItem>
                    

                    <ListItemButton onClick={Expand}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Evaluation" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => ChangeMenu('EVALUATION')}>
                                <ListItemIcon>
                                    <Remove />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Evaluation" 
                                    primaryTypographyProps={{fontSize: '13px', lineHeight: '13px'}} />
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => ChangeMenu('EVALREPORT')}>
                                <ListItemIcon>
                                    <Remove />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Report" 
                                    primaryTypographyProps={{fontSize: '13px', lineHeight: '13px'}}/>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => ChangeMenu('ALLOWANCE')}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Allowance Status" />
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