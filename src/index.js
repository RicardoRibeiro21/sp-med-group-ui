import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Login from "../src/Pages/Login/login";
import Especializacao from '../src/Pages/Especizalicacoes/Especializacao';
import App from '../src/Pages/Home/App';
import Consultas from '../src/Pages/Consultas/Consultas';

    const rotas =  (
        <Router>
            <div>
                <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/Especializacoes" component={Especializacao} />
                <Route path="/Consultas" component={Consultas} />
                {/* <Route component={NaoEncontrada}/> */} 
                </Switch>
            </div>
        </Router>
    )

    
ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
