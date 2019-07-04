import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReactDataSheet from 'react-datasheet';
import Graph from './Graph/Graph';
import 'react-datasheet/lib/react-datasheet.css';

const Content = inject('store')(
    observer(class Content extends Component {
        render() {
            const updateRecords = (changes) => {
                let records = this.props.store.records.map(row => [...row])
                changes.forEach(({ cell, row, col, value }) => {
                    records[row][col] = { ...records[row][col], value }
                    this.props.store.setRecords(records)
                })
            };

            return (
                <Grid container id="content-container">
                    <Grid item id="content-left" >
                        <Paper square={true} className="sheet-container">
                                <ReactDataSheet
                                    data={this.props.store.records}
                                    valueRenderer={(cell) => cell.value}
                                    onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                                    onCellsChanged={updateRecords}
                                />
                        </Paper>
                        </Grid>
                    <Grid item id="content-right" >
                        <Graph />
                    </Grid>
                </Grid>
            )
        }
    })
);

export default Content;