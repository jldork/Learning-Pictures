import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Bar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';

function range_generator(dataLength) {
    let x = []; let i = 1;
    while (x.push(i++) < dataLength) { };
    return x
}

const Graph = inject('store')(
    observer(class Graph extends Component {
        render() {
            const options = {
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                }
            }
            let data = {
                labels: range_generator(12),
                datasets: [
                    {
                        label: 'Lesson LU',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 0.5,
                        hoverBackgroundColor: 'rgba(0,0,0,0.8)',
                        hoverBorderColor: 'rgba(0,0,0,1)',
                        data: [7, 7, 7, 5, 7, 7, 7, 6, 2, 6, 7, 7]
                    },
                    {
                        label: 'Tactic',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        borderColor: 'rgba(255,0,0,1)',
                        borderWidth: 0.5,
                        hoverBackgroundColor: 'rgba(255,0,0,0.8)',
                        hoverBorderColor: 'rgba(255,0,0,1)',
                        data: [6, 5, 1, 2, 3, 4, 1, 6, 3, 6, 7, 3]
                    }
                ]
            };
            return (
                <Grid item>
                    <h2>Bar Example (custom size)</h2>
                    <Bar
                        data={data}
                        options={{ options }}
                    />
                </Grid>
            )
        }
    })
);

export default Graph;

