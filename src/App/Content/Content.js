import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

const Content = inject('store')(
    observer(class Content extends Component {
    render() {
        // const updateGrid = ({cell, row, col, value}) => {
        //         this.props.grid[row][col] = {...grid[row][col], value}
        //       };

        return (
            <div id="sheet">
                <ReactDataSheet
                    data={this.props.store.records}
                    valueRenderer={(cell) => cell.value}
                    onCellsChanged={changes => {
                        console.log("changes")
                        console.log(changes)
                        // const grid = this.state.grid.map(row => [...row])
                        // changes.forEach(updateGrid)
                        // this.setState({grid})
                      }}
                />
            </div>
        );
    }
}))

export default Content;