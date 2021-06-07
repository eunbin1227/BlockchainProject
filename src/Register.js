import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {Button, Card} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
    constructor(name, quantity, time, fee) {
        this._name = name;
        this._quantity = quantity;
        this._time = time;
        this._fee = fee;
    }

    get name() {
        return this._name
    }

    get quantity() {
        return this._quantity
    }

    get time() {
        return this._time
    }

    get fee() {
        return this._fee
    }
}


export default function Register() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [time, setTime] = useState('');
    const [fee, setFee] = useState('');

    function handleSubmit(event) {
        const info = new Infos(name, quantity, time, fee);
        localStorage.setItem(info.name, JSON.stringify(info));

        console.log(name, quantity, time, fee);
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
                                       id="time"
                                       label="Time"
                                       variant="outlined"
                                       value={time}
                                       onChange={e=>setTime(e.target.value)}/> <br/>
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
