import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Paper from '@material-ui/core/Paper';
import DragAndDrop from './DragAndDrop';
import Papa from 'papaparse';

import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const Datasheet = inject('store')(
    observer(class Datasheet extends Component {

        updateRecords = (changes) => {
            let records = this.props.store.records.map(row => [...row])
            changes.forEach(({ cell, row, col, value }) => {
                records[row][col] = { ...records[row][col], value }
            })
            this.props.store.setRecords(records)
        };

        handleDrop = (files) => {
            let rowNum = 0;

            Papa.parse(files[0], {
                worker: true,
                step: (result) => {
                    let row = result.data;
                    let changes = [];
                    let newVal;

                    for (let colNum = 0; colNum < row.length; colNum++) {
                        if (rowNum === 0) {
                            newVal = row[colNum]
                        } else if (colNum === 0) { //Date
                            newVal = row[colNum]
                        } else if (colNum === 1) { // Lesson LU
                            newVal = parseInt(row[colNum]) || 0
                        } else {
                            newVal = parseInt(row[colNum]) || 0
                        }
                        changes.push({
                            row: rowNum,
                            col: colNum + 1,
                            value: newVal
                        })
                    };

                    this.updateRecords(changes);
                    rowNum++;
                },
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