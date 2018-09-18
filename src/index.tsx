import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import store from './components/data/Store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter><App store={store}/></BrowserRouter>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
