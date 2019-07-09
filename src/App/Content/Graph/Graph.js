import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';

function countvalues(a) {
    var b = {}, i = a.length, j;
    while (i--) {
        j = b[a[i]];
        b[a[i]] = j ? j + 1 : 1;
    }
    return b; // an object of element:count arrays
}

const Graph = inject('store')(
    observer(class Graph extends Component {
        render() {
            console.log(this.props.store.schoolYearDateArray)

            let objective_data = [
                {
                    x: this.props.store.learningData.objective,
                    y: this.props.store.records.map((row) => row[2].value),
                    type: 'bar',
                    marker: { color: 'black' },
                    name: 'Lesson LU'
                },
                {
                    x: this.props.store.learningData.objective,
                    y: this.props.store.records.map((row) => row[3].value),
                    type: 'bar',
                    marker: { color: 'red' },
                    name: 'Tactic'
                },
                {
                    x: this.props.store.learningData.objective,
                    y: this.props.store.records.map((row) => row[4].value),
                    type: 'bar',
                    marker: { color: 'blue' },
                    name: 'Protocol'
                },
                {
                    x: this.props.store.schoolYearDateArray.map(
                        (momentObj) => {
                            return momentObj.format('YYYY-MM-DD 00:00:00')
                        }),
                    y: new Array(this.props.store.schoolYearDateArray.length).fill(5),
                    yaxis: 'y2',
                    xaxis: 'x2'
                }
            ]

            const stackedBarLayout = {
                title: 'Student Name - Grade - Subject', barmode: 'stack',
                xaxis: {
                    title: {
                        text: "Objective Number"
                    },
                    ticks: 'inside'
                },
                yaxis: {
                    title: {
                        text: "Learn Units to Meet an Objective"
                    },
                    range: [0, 30]
                },
                yaxis2: {
                    title: 'yaxis2 title',
                    overlaying: 'y',
                    side: 'right'
                },
                xaxis2: {
                    title: 'Date',
                    overlaying: 'x',
                    side: 'top',
                    type: "date",
                    tickformat: '%m/%d',
                    nticks: 12
                },
                legend: {
                    orientation: 'h', // Horizontal
                    x: 0.25,
                    y: 1.18
                },
            }

            return (

                <Grid item>
                    <Plot data={objective_data} layout={stackedBarLayout} />
                </Grid>
            )
        }
    })
);

export default Graph;