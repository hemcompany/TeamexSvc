import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useMenuContext} from "../provider/MenuProvider";
import logo from '../assets/logo.png';

// MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';

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
    const setMenu = useMenuContext().setMenu;
    const setMenuName = useMenuContext().setMenuName;
    const setWindowName = useMenuContext().setWindowName;
    const [menuList, setMenuList] = useState([]);

    const navigate = useNavigate();
    const ChangeMenu = (selMenu, selMenuName, selWindowName, window_yn) => {
        if (window_yn==="Y") {
            //console.log("Menu Bar : ChangeMenu");
            setMenu(selMenu);
            setMenuName(selMenuName);
            setWindowName(selWindowName);
        }
    };
    const handleLogout = () => {
    	sessionStorage.removeItem("div");
    	sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
    	sessionStorage.removeItem("type");
    	navigate("/login");
  	};

    const getMenuList = async () => { 
        const MENU_LIST_URL = "/api/login/getMenuList";
        try {
            axios(MENU_LIST_URL, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json;charset=UTF-8", 
                  "Accept": "application/json",
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Access-Control-Allow-Credentials":"true",},
                params: { 
                    id:sessionStorage.getItem("id"), 
                    div: sessionStorage.getItem("div"),
                },
            })
            .then((res) => {
                const menuTree = setMenuTree(res.data);
                setMenuList(menuTree);
            })
            .catch((e) => {
                console.error(e);
                alert(e);
            });
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    // 화면 처음 렌더링 될 때 호출 되는 함수
    useEffect(() => {
        //console.log("MenuBar 1");
        //로그인 체크 
        if (sessionStorage.getItem("id")==="" || sessionStorage.getItem("id")=== null){
          navigate("/login");
          return;
        }
        // API를 이용하여 Menu List 조회
        getMenuList();
        //수정필요
        ChangeMenu('FIELDREPAIR', 'Field Repair', 'FieldRepair', 'Y');
    }, []);

    // 사용자 권한 별 메뉴 트리 구성
    const setMenuTree = (data) => {
        const map = {};
        const tree = [];

        //데이터를 맵으로 변환
        data.forEach((item) => {
            map[item.menu_id] = {...item, children: [] };
        });
        //부모 - 자식 관계 설정
        data.forEach((item) => {
            if(item.parent_menu) {
                map[item.parent_menu].children.push(map[item.menu_id]);
            } else {
                tree.push(map[item.menu_id]);
            }
        });
        return tree;
    }

    const i = 0;
    const renderMenuList = (nodes) =>
        nodes.map((node) => (
            <CustomTreeItem
                key = {node.menu_id}
                itemId = {node.menu_id}
                label = {node.menu_name}
                onClick={() => ChangeMenu(node.menu_id, node.menu_name, node.window_name, node.window_yn)}
            >
                {node.children.length > 0  && renderMenuList(node.children)}
            </CustomTreeItem>
        ));
    
    
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
                    <SimpleTreeView defaultExpandedItems={["SERVICE","PROD","SALES"]}>
                        {renderMenuList(menuList)}
                        <Divider />
                        <CustomTreeItem 
                            itemId="LOGOUT" label="Log Out" onClick={() => handleLogout()} slots={{icon: ExitToAppIcon}}/>
                    </SimpleTreeView>
                </Box>
            </Drawer>
        </>
    );
}