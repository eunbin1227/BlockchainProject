import './App.css';
import { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import SignUp from './SignUp';
import List from './List';
import Register from './Register';

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={Main}/>
                    <Route path="/SignUp" component={SignUp}/>
                    <Route path="/List" component={List}/>
                    <Route path="/Register" component={Register}/>
                </BrowserRouter>
            </div>
        )
    }
}

