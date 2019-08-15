import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import DragAndDrop from './DragAndDrop';
import Papa from 'papaparse';
import moment from 'moment';
import DataFrame from 'dataframe-js';

import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const Datasheet = inject('store')(
    observer(class Datasheet extends Component {

        updateRecords = (changes) => {
            let dataState = this.props.store.learningData.toArray();
            changes.forEach(({ cell, row, col, value }) => {
                let index = row - 1;
                dataState[index][col] = value;            
            })
            this.props.store.setLearningData(
                new DataFrame(dataState, this.props.store.columns)
                )
        };

        handleDrop = (files) => {
            Papa.parse(files[0], {
                worker: true,
                delimiter: '\t',
                complete: (results) => {
                    let df = new DataFrame(results.data.slice(1), this.props.store.columns)
                        .withColumn(
                            "DATES MET",
                            row => moment(row.get("DATES MET"))
                        );
                    this.props.store.setLearningData(df);
                }
            })

        };

        render() {
            const sheetData = this.props.store.records;
            return (
                <Paper square={true} className="sheet-container">
                    <h3 className="datasheet-title">Learning Data</h3>
                    <DragAndDrop handleDrop={this.handleDrop}>
                        <ReactDataSheet
                            data={sheetData}
                            valueRenderer={(cell) => cell.value}
                            onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                            onCellsChanged={this.updateRecords}
                        />
                    </DragAndDrop>
                </Paper>
            )
        }
    }));

export default Datasheet;