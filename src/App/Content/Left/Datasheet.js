import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import Paper from '@material-ui/core/Paper';
import DragAndDrop from './DragAndDrop';
import Papa from 'papaparse';
import moment from 'moment';

import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const Datasheet = inject('store')(
    observer(class Datasheet extends Component {

        updateRecords = (changes) => {
            let records = toJS(this.props.store.learningData);
            changes.forEach(({ cell, row, col, value }) => {
                let index = row - 1;
                switch (col) {
                    case 1:
                        records.datesMet[index] = value;
                        break;
                    case 2:
                        records.lessonLearnUnits[index] = value;
                        break;
                    case 3:
                        records.tactic[index] = value;
                        break;
                    case 4:
                        records.protocol[index] = value;
                        break;
                    default:
                        console.log("Error:", cell, row, col, value);
                }
            })
            this.props.store.setLearningData(records)
        };

        handleDrop = (files) => {
            Papa.parse(files[0], {
                worker: true,
                complete: (results) => {
                    const result_matrix = results.data;
                    let sheetState = toJS(this.props.store.learningData);

                    for (let i = 1; i < results.data.length; i++) {
                        sheetState.datesMet[i - 1] = moment(result_matrix[i][0]);
                        sheetState.lessonLearnUnits[i - 1] = result_matrix[i][1];
                        sheetState.tactic[i - 1] = result_matrix[i][1];
                        sheetState.protocol[i - 1] = result_matrix[i][2];
                    }
                    this.props.store.setLearningData(sheetState);
                }
            })

        };

        render() {
            const sheetData = this.props.store.records;
            return (
                <Paper square={true} className="sheet-container">
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