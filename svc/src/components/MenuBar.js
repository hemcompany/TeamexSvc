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
import logo from '../assets/logo.png';

const drawerWidth = 220;
export default function MenuBar() {
    const {menu, setMenu} = useMenuContext();
    const ChangeMenu = (menuName) => {
        setMenu(menuName);
    }
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
                    <Typography variant='h7'>HEM JUNG</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" padding={0.5}>
                    <Typography variant='h7'>IT TEAM</Typography>
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
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => ChangeMenu('USER')}>
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="User" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
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