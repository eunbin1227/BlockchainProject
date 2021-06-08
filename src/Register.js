import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {Button, Card} from "@material-ui/core";
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

export class Infos {
    constructor(name, quantity, stime, etime, fee, address, p_id) {
        this._name = name;
        this._quantity = quantity;
        this._stime = stime;
        this._etime = etime;
        this._fee = fee;
        this._address = address;
        this._p_id = p_id;
    }

    get name() {
        return this._name
    }

    get quantity() {
        return this._quantity
    }

    get stime() {
        return this._stime
    }

    get etime() {
        return this._etime
    }

    get fee() {
        return this._fee
    }

    get address() {
        return this._address
    }

    get pid() {
        return this._p_id
    }

}


export default function Register() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stime, setStime] = useState('');
    const [etime, setEtime] = useState('');
    const [fee, setFee] = useState('');

    function handleSubmit(event) {

        const accounts = window.ethereum.request({method: 'eth_requestAccounts'});
        accounts.then(function(acc){
            const myContract = new web3.eth.Contract(abi, address);
            var p_id = 0;
            myContract.methods.check_com(acc[0]).call().then(function(num){
                p_id = num+1;
            });
            myContract.methods.register_place(
                name,name,acc[0],Number(p_id),Number(quantity),Number(fee),Number(stime),Number(etime)
            ).send({from: acc[0]});

            const info = new Infos(name, quantity, stime, etime, fee, acc[0],p_id);
            localStorage.setItem(info.name, JSON.stringify(info));
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
                                       id="name-loc"
                                       label="Name, Location"
                                       variant="outlined"
                                       value={name}
                                       onChange={e => setName(e.target.value)}/> <br/>
                            <TextField required
                                       id="quantity"
                                       label="Quantity"
                                       variant="outlined"
                                       value={quantity}
                                       onChange={e=>setQuantity(e.target.value)}/> <br/>
                            <TextField required
                                       id="stime"
                                       label="Starting Time"
                                       variant="outlined"
                                       value={stime}
                                       onChange={e=>setStime(e.target.value)}/> <br/>
                            <TextField required
                                       id="etime"
                                       label="End Time"
                                       variant="outlined"
                                       value={etime}
                                       onChange={e=>setEtime(e.target.value)}/> <br/>
                            <TextField required id="fee-per-min"
                                       label="Fee per min"
                                       variant="outlined"
                                       value={fee}
                                       onChange={e=>setFee(e.target.value)}/> <br/>
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
                            </Button> <br/>
                        </Grid>
                    </div>
                </form>
            </Card>
        </Grid>
    );
}
