import React from 'react';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';

function LoginPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const { id, password } = event.target.elements;
        console.log('ID: ', id.value, 'Password: ', password.value);
    };

    return (
        <>
            <Paper elevation={3} sx={{height:"100vh", position:"absolute", width: "100%", left:0, top:0 }}>
            </Paper>
            <Container maxWidth="xs" sx={{ position: "relative", zIndex: 999, marginTop: "100px" }}>
                <Paper elevation={1} style={{ padding: '20px' }}>
                    <Typography variant='h5' align='center' gutterBottom>
                        Please Sign in
                    </Typography>
                    <form onSubmit={ handleSubmit }>
                        <Grid containter spacing={2}>
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
}

export default LoginPage; 