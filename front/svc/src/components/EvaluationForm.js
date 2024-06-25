import * as React from 'react';
import { useState } from "react";
import axios from 'axios';
import useDidMountEffect from '../utils/useDidMountEffect';
import { Paper, Box, Button, Grid, Rating, TextField} from '@mui/material';
import { List, ListItem, ListItemText, Typography, Divider} from '@mui/material';
import { styled } from '@mui/system';

function EvaluationForm({reportinfo, fetchList}) {
    const EVALUATION_ITEM_URL = "/api/evaluation/item/list";
    const EVALUATION_RESULT_URL = "/api/evaluation/save/result"

    
    const [inputs, setInputs] = useState([]);    //평가 INPUT FIELD 정보 저장
    const [errors, setErrors] = useState({});    //평가 결과 0~2 사이인 경우 comment 필수 체크
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f6f6f6',
        ...theme.typography.subtitle2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function ReportHd({reportHd}){
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Item variant="outlined">Report NO</Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                        <Typography variant="button">
                            {reportHd.reportno}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Item variant="outlined">Eval Sts.</Item>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                        <Typography variant="button">
                            {reportHd.ev_sts_nm}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Item variant="outlined">Eval Type</Item>
                    </Grid>
                    <Grid item xs={9} mt={1}>
                        <Typography variant="button">
                            {reportHd.ev_cls_nm}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Item variant="outlined">Technician(s)</Item>
                    </Grid>
                    <Grid item xs={9} mt={1}>
                        <Typography variant="button">
                        {reportHd.technician}
                        </Typography>
                    </Grid>
                </Grid>
            </>
   )};
    
    // GRID에서 평가할 REPORT 선택 될 때 호출 되는 함수 : 해당 REPORT EVALUATION ITEM 조회
    useDidMountEffect(() => {
        const fetchItem = async () => { 
            try {
                axios(EVALUATION_ITEM_URL, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8", 
                        "Accept": "application/json",
                        "Access-Control-Allow-Credentials":"true",},
                    params: reportinfo,
                })
                .then((res) => {
                    const data = res.data.map(item => ({
                        ...item, ev_comment: item.ev_comment !== null ? item.ev_comment : ""
                    }));
                    setInputs(data);
                })
                .catch((e) => {
                    console.error(e);
                    alert(e);
                });
            } catch (err) {
                console.log(err);
                alert(err);
            }
        };
        fetchItem();
    }, [reportinfo]);

    useDidMountEffect(() => {
        //console.log(inputs);
    }, [inputs]);

    const handleChange = (e, id, field) => {
        //console.log("C.handleChange id : " + id + ", value : " + parseInt(e.target.value));
        const newInputs = inputs.map((item) => 
        item.id === id ? { ...item, 
            [field] : parseInt(e.target.value)
        } : item );
        setInputs(newInputs);
    };

    const handleCmtChange = (e, id, field) => {
        //console.log("C.handleCmtChange id : " + id + ", value : " + e.target.value);
        const newInputs = inputs.map((item) => 
        item.id === id ? { ...item, 
            [field] : e.target.value
        } : item );
        setInputs(newInputs);
    };
    
    const checkCmt = () => {
        const newErrors = {};
        inputs.forEach((input, index) => {
            if(input.ev_result >= 0 && input.ev_result <= 2 && !input.ev_comment){
                newErrors[index] = "Comment is required when result is between 0 and 2.";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length ===0;
    };

    //입력한 평가정보 DB 저장
    const handleSubmit = (e)  => {
        e.preventDefault(); // Prevent the default submit and page reload

        const saveItem = async () => {
            axios.post(EVALUATION_RESULT_URL, inputs)
                .then(function (response) {
                    alert("Saved!");
                    //console.log(response);
                    fetchList();
                })
                .catch(function (error) {
                    alert("Failed!");
                    console.log(error);
                });
        };

        if (checkCmt()) {
            saveItem();
        }
    };
    return(
        
        <Paper elevation={3}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ m: 1, flexGrow: 1 }}>
                    {inputs.length > 0 && (
                        <ReportHd reportHd={inputs[0]} />
                    )}
                </Box>
                <Box sx={{ position:'relative', m: 1, height: '45vh', flexWrap: 'wrap', overflow: 'auto', border:1, borderColor:'#e6e6e6'}} >
                <List sx={{ width: '91%', minWidth: '91%', mr: 5}}>
                {inputs && inputs.map((item, index) => (
                    <div key={item.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    > {item.ev_code}  — {item.ev_category}
                                    </Typography>
                                </React.Fragment>
                            }
                            secondary={item.ev_item}
                        />
                    </ListItem>
                    <ListItem alignItems="center">
                        <React.Fragment>
                            <Rating value={item.ev_result} defaultValue={0} max={5} 
                                    onChange={(e) => handleChange(e, item.id, 'ev_result')} />

                            <TextField value={item.ev_comment} 
                                        onChange={(e) => handleCmtChange(e, item.id, 'ev_comment')}
                                        error={errors[index]? true : false}
                                        helperText={errors[index]}
                                        label="Comment"
                                        multiline
                                        maxRows={2}
                                        fullWidth
                                        size="small"
                                        inputProps={{style: {fontSize: 14}}}
                                        InputLabelProps={{ shrink: true }}  
                                        sx={{ml:3}}/>
                        </React.Fragment>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </div>
                ))}
                </List>
                    
                </Box>
                <Box sx={{position:'relative', display: 'flex', flexGrow: 1, justifyContent: 'center'}} align="center">
                    <Button 
                        variant="outlined" 
                        type="submit" 
                        size="normal"
                        sx={{ mb: 1 }}
                    >Save
                    </Button>
                </Box>
            </form>
        </Paper>
    );
} 

export default EvaluationForm;
