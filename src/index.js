import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: Colors.teal400,
        primary2Color: Colors.orange300,
        primary3Color: Colors.grey400,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.grey900,
        alternateTextColor: Colors.orange300,
        canvasColor: Colors.white,
        borderColor: Colors.grey300
    },
    appBar: {
        height: 50,
    },
    raisedButton: {
        primaryTextColor: Colors.white
    },
    card: {
        titleColor: Colors.grey500
    }

});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <App />
    </MuiThemeProvider>, document.getElementById('root')
    );