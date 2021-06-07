import {Card, Popover} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SignUp from "./SignUp";
import Container from "@material-ui/core/Container";
import React, {useState} from "react";
import {login} from "./Api";
const LOGIN_KEY = 'LOGIN_KEY';


export default function Main() {
    const classes = useStyles();

    const [id, setId] = useState();
    const [password, setPassword] = useState();

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const { key } = await login(id, password);
    //     localStorage.setItem(LOGIN_KEY, key);
    // }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const ids = open ? 'simple-popover' : undefined;

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <Card className={classes.root} elevation={3}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Rent Parking Lot Using Blockchain <br/><br/>
                            </Typography>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate /*onSubmit={handleSubmit}*/>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="id"
                                    label="ID"
                                    name="id"
                                    autoComplete="id"
                                    autoFocus
                                    onChange={e => setId(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button fullWidth variant="contained" color="primary" className={classes.submit} href="/List">
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Button onClick={handleClick} aria-describedby={ids}>
                                            {"Don't have an account? Sign Up"}
                                            <Popover id = {ids} open={open} anchorEl={anchorEl} onClose={handleClose}>
                                                <SignUp />
                                            </Popover>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                    <StickyFooter/>
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
//       backgroundColor: 'pink',
    },
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
//        backgroundColor: 'yellow',
    },
    title: {
        fontSize: 70,
        textAlign: "center",
//        backgroundColor: 'blue',
    },
    content: {
        height: '65vh',
        display: 'grid',
        placeItems: 'center',
//        backgroundColor: 'grey',
    },
    bottomButton: {
        marginTop: '15vh',
        marginLeft: 'auto',

//        backgroundColor: 'red',
    },
    nextButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: '2vw',
    },
    skipButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: "1vw",
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Noto Sans KR', 'sans-serif'
        ].join(','),
    },
});