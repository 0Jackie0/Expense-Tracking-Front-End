import React from 'react';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from "./login/login"
import MainBody from './component/mainBody';

function App() 
{
  return (
    <BrowserRouter>
      <div className="d-flex justify-content-center appbackground">
        <Switch>
            <Route exact path="/"> <Login/> </Route>
            <Route path="/main"> <MainBody/> </Route>
        </Switch>
      </div>
      </BrowserRouter>
      
  );
}

export default App;
