import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Link} from 'react-router-dom';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignIn from "./SignIn";


export default function Main() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <Card className={classes.root} elevation={3}>
                    <SignIn />
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

}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Noto Sans KR', 'sans-serif'
        ].join(','),
    },
});