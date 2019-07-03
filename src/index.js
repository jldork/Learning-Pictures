import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>, document.getElementById('root')
    );