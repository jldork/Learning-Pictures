import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import Datasheet from './Left/Datasheet';
import Graph from './Graph/Graph';
import DateForm from './Left/DateForm';

const Content = inject('store')(
    observer(class Content extends Component {
        render() {
            return (
                <Grid container id="content-container">
                    <Grid item id="content-left" ><DateForm/><Datasheet /></Grid>
                    <Grid item id="content-right" ><Graph /></Grid>
                </Grid>
            )
        }
    })
);

export default Content;