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
                                       onChange={e => setPlate(e.target.value)}/> <br/>
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
