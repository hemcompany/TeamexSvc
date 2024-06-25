import React from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import logo from '../assets/logo.png';

function LoginPage() {
    const navigate = useNavigate();
    const LOGIN_URL = "/api/login/do";
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { div, id, password } = event.target.elements;
        console.log('DIV: ', div.value, 'ID: ', id.value, 'Password: ', password.value);
        //await new Promise((r) => setTimeout(r, 1000));
        //로그인 처리
        axios.post(LOGIN_URL, {
            inputDiv:div.value, 
            inputId:id.value, 
            inputPass:password.value,
        })
        .then((res) => {
            //console.log("res.data.userId :: ", res.data.user_id);
            const userInfo = res.data;
            if (userInfo.user_id === undefined) {
                // id 일치하지 않는 경우 모든 정보 없음'
                alert("입력하신 id 가 일치하지 않습니다.");
            } else if (userInfo.div === null) {
                // id는 있지만, pw 는 다른 경우 user_id = 아이디 , 다른정보는 null
                alert("입력하신 비밀번호 가 일치하지 않습니다.");
            } else if (userInfo.user_id.upper === id.value.upper) {
                // id, pw 모두 일치 : 세션저장
                sessionStorage.setItem("div", userInfo.div); 
                sessionStorage.setItem("id", userInfo.user_id);
                sessionStorage.setItem("name", userInfo.lname + " " + userInfo.fname);
                sessionStorage.setItem("type", userInfo.priority_class);
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            navigate("/");
        })
        .catch((e) => {
            console.error(e);
            alert(e);
        });
    };

    return (
        <>
        <Paper elevation={3} sx={{height:"100vh", position:"absolute", width: "100%", left:0, top:0 }}>
        </Paper>
        <Container maxWidth="xs" sx={{ position: "relative", zIndex: 999, marginTop: "100px" }}>
            <Paper elevation={1} style={{ padding: '20px' }}>
                <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
                    <img src={logo} alt="Logo" />
                </Box>
                <Typography variant='h6' align='center' gutterBottom>
                    Please Sign in
                </Typography>
                <form onSubmit={ handleSubmit }>
                    <Grid>
                        <Grid item xs={12} sx={{margin: 2}}>
                            <TextField
                                fullWidth
                                id="div"
                                label="DIV"
                                variant="outlined"
                                name="div"
                                type="text"
                                defaultValue="80"
                                required
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{margin: 2}}>
                            <TextField
                                fullWidth
                                id="id"
                                label="ID"
                                variant="outlined"
                                name="id"
                                type="text"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{margin: 2}}>
                            <TextField
                                fullWidth
                                id="password"
                                label="PASSWORD"
                                variant="outlined"
                                name="password"
                                type="password"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{margin: 2}}>
                        <Button type="submit" variant="contained" color="primary" fullWidth >
                            Sign in
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </>
    );
};
export default LoginPage; 