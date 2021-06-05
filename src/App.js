import './App.css';
import { useState } from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Main';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function App() {
      const [user, setUser] = useState(null);
      if(user) console.log(user);

    return(
        <div className="wrapper">
          <BrowserRouter>
            <Route path="/" component={Main} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
          </BrowserRouter>
        </div>
    )
}

