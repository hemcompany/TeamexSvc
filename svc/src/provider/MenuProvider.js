import {createContext, useContext, useState} from 'react';

const MenuContext = createContext();

export const MenuProvider = ({children}) => {
    const [menu, setMenu] = useState("FIELDREPAIR");

    return (
        <MenuContext.Provider value = {{menu, setMenu}}>
            {children}
        </MenuContext.Provider>
    );

}

export const useMenuContext = () => useContext(MenuContext);
