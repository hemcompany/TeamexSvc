import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {useMenuContext} from "../provider/MenuProvider";
import logo from '../assets/logo.png';

// MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 220;
  
const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(0.2, 0),
      [`& .${treeItemClasses.label}`]: {
        fontSize: '0.8rem',
        fontWeight: 500,
      },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      borderRadius: '50%',
      backgroundColor:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.primary.main, 0.25)
          : theme.palette.primary.dark,
      color: theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
      padding: theme.spacing(0, 1.2),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
      marginLeft: 15,
      paddingLeft: 0,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

export default function MenuBar() {
    const {menu, setMenu} = useMenuContext();

    const navigate = useNavigate();
    const ChangeMenu = (menuName) => {
        setMenu(menuName);
    };
    const handleLogout = () => {
    	sessionStorage.removeItem("div");
    	sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
    	sessionStorage.removeItem("type");
    	navigate("/login");
  	};

    let consolidationTree;
    //if(sessionStorage.getItem("id")==="DHCHOI" || sessionStorage.getItem("id")==="DEV") {
        consolidationTree = (
            <CustomTreeItem itemId="CONSOLIDATION" label="Consolidation Report">
                <CustomTreeItem 
                    itemId="CONSEVC" label="EVC Consolidated Report" onClick={() => ChangeMenu('CONSEVC')}/>
            </CustomTreeItem>
        );
    //}
 
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
                <Box display="fit" justifyContent="left" alignItems="left" pt={2}>
                <SimpleTreeView
                    defaultExpandedItems={['SERVICE']}
                >
                    <CustomTreeItem itemId="SERVICE" label="SERVICE">
                        <CustomTreeItem 
                            itemId="FIELDREPAIR" label="Field Repair" onClick={() => ChangeMenu('FIELDREPAIR')} />
                        <CustomTreeItem itemId="EVAL" label="Evaluation">
                            <CustomTreeItem 
                                itemId="EVALUATION" label="Evaluation" onClick={() => ChangeMenu('EVALUATION')}/>
                            <CustomTreeItem 
                                itemId="EVALREPORT" label="Report" onClick={() => ChangeMenu('EVALREPORT')}/>
                        </CustomTreeItem>
                        <CustomTreeItem itemId="ALLOW" label="Allowance">
                            <CustomTreeItem 
                                itemId="ALLOWANCE" label="Allowance Status" onClick={() => ChangeMenu('ALLOWANCE')}/>
                            <CustomTreeItem 
                                itemId="ALLOWANCEM" label="Allowance Status (Monthly)" onClick={() => ChangeMenu('ALLOWANCEM')}/>
                        </CustomTreeItem>
                        {consolidationTree}
                    </CustomTreeItem>
                    <Divider />
                    <CustomTreeItem 
                        itemId="LOGOUT" label="Log Out" onClick={() => handleLogout()} slots={{icon: ExitToAppIcon}}/>
                </SimpleTreeView>
                </Box>
            </Drawer>
        </>
    );
}