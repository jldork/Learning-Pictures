import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import './index.css';
import { ThemeProvider } from '@material-ui/styles';

ReactDOM.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>, document.getElementById('root')
    );