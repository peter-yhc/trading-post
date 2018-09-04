import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import store from './components/data/Store'

ReactDOM.render(<BrowserRouter><App store={store}/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
