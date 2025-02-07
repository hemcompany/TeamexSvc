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
import CssBaseline from '@mui/material/CssBaseline';

// [24.03.25] HEM ADD
import { MenuProvider } from './provider/MenuProvider';

function App() {
    const [dark, setDark] = React.useState(false);
    const [theme, setTheme] = React.useState(createTheme({typography: {
        fontSize: 13,
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    fontSize: '13px',
                    fontFamily: 'sans-serif',
                },
                columnHeader: {
                    fontSize: '13px',
                    backgroundColor: '#f0f8ff',
                },
                cell: {
                    fontSize: '12px',
                },
                footerContainer: {
                    fontSize: '12x',
                },
            },
        },
    },}));
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2'
            },
        },
        typography: {
            fontSize: 13,
        },
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        fontSize: '13px',
                        fontFamily: 'sans-serif',
                    },
                    columnHeader: {
                        fontSize: '13px',
                        backgroundColor:  '#f0f8ff',
                    },
                    cell: {
                        fontSize: '12px',
                    },
                    footerContainer: {
                        fontSize: '12x',
                    },
                },
            },
        },
    });

    const defaultTheme = createTheme({
        typography: {
            fontSize: 13,
        },
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        fontSize: '13px',
                        fontFamily: 'sans-serif',
                    },
                    columnHeader: {
                        fontSize: '13px',
                        backgroundColor:  '#f0f8ff',
                    },
                    cell: {
                        fontSize: '12px',
                    },
                    footerContainer: {
                        fontSize: '12x',
                    },
                },
            },
        },
    });

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
                <CssBaseline />
                <MenuProvider>
                    <Router future={{v7_startTransition: true, v7_relativeSplatPath: true,}}>
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
