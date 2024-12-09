import {createContext, useContext, useState} from 'react';

const MenuContext = createContext();

export const MenuProvider = ({children}) => {
    const [menu, setMenu] = useState([]);
    const [menuName, setMenuName] = useState("");
    const [windowName, setWindowName] = useState("");
    return (
        <MenuContext.Provider value = {{menu, setMenu, menuName, setMenuName, windowName, setWindowName}}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenuContext = () => useContext(MenuContext);
