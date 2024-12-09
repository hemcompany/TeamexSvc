import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import { Fab } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MorningIcon from '@mui/icons-material/WbSunny';
import NightIcon from '@mui/icons-material/Brightness3';

// [24.03.25] HEM ADD
import { MenuProvider } from './provider/MenuProvider';

function App() {
    const [dark, setDark] = React.useState(false);
    const [theme, setTheme] = React.useState(createTheme());
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2'
            },
        },
    });

    const defaultTheme = createTheme();
    const ThemeChange = () => {
        if (dark) {
            setTheme(defaultTheme);
        } else {
            setTheme(darkTheme);
        }
        setDark(!dark);
    }
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                <MenuProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </Router>
                    <Fab size="small" onClick={() => ThemeChange()} color="primary" aria-label="add" style={{ position: 'fixed', top: 13, right: 80 }}>
                        {dark ? <MorningIcon /> : <NightIcon /> }
                    </Fab>
                </MenuProvider>
                </ThemeProvider>
            </LocalizationProvider>
        </>
    );
}

export default App;
