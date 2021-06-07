import {
    Button,
    Typography,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Divider,
} from '@material-ui/core';
import { Home } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link} from 'react-router-dom';
import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {DataGrid} from '@material-ui/data-grid';

export default function List() {
    const classes = useStyles();

    function allStorage() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while ( i-- ) {
            let value = {id: i}
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


    const rows = allStorage().map(x => JSON.parse(x));


    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <Card className={classes.root} elevation={3}>
                    <CardActions>
                        <div className={classes.actions}>
                            <IconButton component={Link} to="/"> <Home/> </IconButton>
                        </div>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <div>
                            <div className={classes.section1}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h4" component={'span'}>
                                            Stock List
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" component={Link} to="/Register">
                                            Register
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
                            </div>
                            <Divider variant="fullWidth" />
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography component={'span'} gutterBottom variant="h4">
                                        My Info (Identifier)
                                    </Typography>
                                </Grid>
                                <Divider variant="middle"/>
                            </Grid>
                        </div>
                    </CardContent>
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
    },
    actions: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
    },
    title: {
        fontSize: 40,
        fontWeight: 500,
        paddingTop: '10vh',
    },
    content: {
    },
    container: {
        padding: '3vh',
        display: 'grid',
        width: '100vw',
        placeContent: 'center',
    },
    explanation: {
        width: '53vw',
        fontSize: 17,
        fontWeight: 500,
        textAlign: "justify",
        lineHeight: '25px',
    },
    graphContainer: {
        padding: '3vh',
    },
    span: {
        padding: '5vh',
    },
    bottomButton: {
        marginLeft: 'auto',
    },
    prevButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: '2vw',
    },
    nextButton: {
        fontSize: 18,
        textTransform: "none",
        marginRight: "6vw",
    },
    chip: {
        margin: theme.spacing(0.5),
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

}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Noto Sans KR', 'sans-serif'
        ].join(','),
    },
});