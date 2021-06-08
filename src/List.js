import {
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Divider, ListSubheader, ListItem, ListItemText,
} from '@material-ui/core';
import { Home } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from 'react-router-dom';
import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { DataGrid } from '@material-ui/data-grid';
import { abi, address } from './contract';

let Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/bfe23c3b7e0649898c6a4c62b23baf6d'));

export default function List() {
    const classes = useStyles();

    function allStorage() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            let value = { id: i }
            let res = Object.assign(value, JSON.parse(localStorage.getItem(keys[i])));
            values.push(JSON.stringify(res));
        }

        return values;
    }

    const columns = [
        { field: '_name', headerName: 'Name, Location', width: 200 },
        { field: '_quantity', headerName: 'Quantity', width: 150 },
        { field: '_time', headerName: 'Time', width: 150 },
        {
            field: '_fee',
            headerName: 'Fee per min',
            width: 250,
        },

    ];

    function separate(array) {
        let result1 = [];
        let result2 = [];
        for (let i = 0; i < array.length; i++) {
            let temp = JSON.parse(array[i]);
            let length = Object.keys(temp).length;
            if (length === 5) {
                result1.push(temp);
            } else {
                result2.push(temp);
            }
        }
        return [result1, result2];
    }

    // const rows = allStorage().map(x => JSON.parse(x));
    const rows = separate(allStorage())[0];

    //There is plate infos in separate(allStorage())[1];

    function checkIn() {
        const date = new Date();
        const time = Number(date.getHours()) * 100 + Number(date.getMinutes());
        const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts.then(function (acc) {
            const myContract = new web3.eth.Contract(abi, address);
            myContract.methods.check_in(
                //(owneradress), (p_identifier), acc[0],time
            ).send({ from: acc[0] });
        });
    }

    function checkOut() {
        const date = new Date();
        const time = Number(date.getHours()) * 100 + Number(date.getMinutes());
        const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts.then(function (acc) {
            const myContract = new web3.eth.Contract(abi, address);
            myContract.methods.check_out(
                //(owneradress), (p_identifier), acc[0],time
            ).send({ from: acc[0] });
        });
    }

    var usrAddr = "Need Update!";
    var usrPlateNumber = "Need Update!";
    var usrCurrentPlaceName = "Need Update!";
    var test = 1;

    function updateInfo() {
        test = test+1;
        var usrPlaceName = [];
        const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts.then(function (acc) {
            usrAddr = acc[0];
            const myContract = new web3.eth.Contract(abi, address);
            myContract.methods.get_plate_num(acc[0]).call().then(function(num){ usrPlateNumber = String(num) });
            myContract.methods.get_current(acc[0]).call().then(function(name){ usrCurrentPlaceName = name });
            myContract.methods.check_com(acc[0]).call().then(function(num){
                for (var step = 1; step <= num; step++) {
                    myContract.methods.get_place_name(acc[0], step).call().then((name) => { usrPlaceName.push(name) });
                }
            });
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <Card className={classes.root} elevation={3}>
                    <CardActions>
                        <div className={classes.actions}>
                            <IconButton component={Link} to="/"> <Home /> </IconButton>
                        </div>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <div>
                            <div className={classes.section1}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h4" component={'span'} className={classes.span}>
                                            Stock List
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" component={Link} to="/RegisterUser" className={classes.button}>
                                            Register User
                                        </Button>
                                        <Button variant="contained" color="primary" component={Link} to="/Register" className={classes.button}>
                                            Register Stock
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Typography color="textSecondary" variant="body2" component={'span'}>
                                    <Grid container justify="center">
                                        <div style={{ height: 400, width: '80%' }}>
                                            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                        </div>
                                    </Grid>
                                </Typography>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={checkIn} className={classes.button}>
                                        Check In
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={checkOut} className={classes.button}>
                                        Check Out
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={updateInfo} className={classes.button}>
                                        Update My Info
                                    </Button>
                                </Grid>
                            </div>
                            <Divider variant="fullWidth" />
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography component={'span'} gutterBottom variant="h4">
                                        My Info.
                                    </Typography>
                                </Grid>
                                <Divider variant="middle" />
                            </Grid>
                            <Typography gutterBottom variant="h6" align="left">
                                My Wallet Address : {usrAddr}
                            </Typography>
                            <Typography gutterBottom variant="h6" align="left">
                                My Plate Number : {usrPlateNumber}
                            </Typography>
                            <Typography gutterBottom variant="h6" align="left">
                                Now, I am at : {usrCurrentPlaceName}
                            </Typography>
                            <Typography gutterBottom variant="h6" align="left">
                                My Places : ToDo... {test}
                            </Typography>
                        </div>
                    </CardContent>
                    <StickyFooter />
                </Card>
            </div>
        </ThemeProvider>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'grid',
        minHeight: '100vh',
    },
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
    },
    content: {
    },
    container: {
        padding: '3vh',
        display: 'grid',
        width: '100vw',
        placeContent: 'center',
    },
    span: {
        padding: '5vh',
    },
    button: {
        marginLeft: 'auto',
        marginRight: '2vw',
        marginBottom: '2vh',
        marginTop: '2vh',
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Noto Sans KR', 'sans-serif'
        ].join(','),
    },
});