import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Button, Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {abi, address} from './contract';

let Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/bfe23c3b7e0649898c6a4c62b23baf6d'));

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    card: {
        width: 210,
    }
}));

export class Users {
    constructor(plate) {
        this._plate = plate;

    }

    get plate() {
        return this._plate
    }
}


export default function RegisterUser() {
    const classes = useStyles();
    const [plate, setPlate] = useState('');

    function handleSubmit(event) {
        const user = new Users(plate);
        localStorage.setItem(user.plate, JSON.stringify(user));
        
        const accounts = window.ethereum.request({method: 'eth_requestAccounts'});
        accounts.then(function(acc){
            const myContract = new web3.eth.Contract(abi, address);
            myContract.methods.give_plate_num(acc[0], Number(plate)).send({from: acc[0]});
        });
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Card elevation={3} className={classes.card}>
                <Typography gutterBottom variant="h4" align='center'>
                    Register
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <Grid container>
                            <TextField required
                                id="plate"
                                label="Plate Number"
                                variant="outlined"
                                value={plate}
                                onChange={e => setPlate(e.target.value)} /> <br />
                        </Grid>
                        <Grid container>
                            <Button type="submit"
                                variant="contained"
                                color="primary"
                                component={Link}
                                to='/List'
                                className={classes.button}
                                onClick={handleSubmit}
                            >
                                Register
                            </Button> <br />
                        </Grid>
                    </div>
                </form>
            </Card>
        </Grid>
    );
}
