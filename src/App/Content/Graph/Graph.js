import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Chart from "chart.js";
import Grid from '@material-ui/core/Grid';

function range_generator(dataLength) {
    let x = []; let i = 1;
    while (x.push(i++) < dataLength) { };
    return x
}

const Graph = inject('store')(
    observer(class Graph extends Component {
        chartRef = React.createRef();
        options = {
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
        data = {
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
                },
                {
                    label: 'Protocol',
                    backgroundColor: 'rgba(0,0,255,0.5)',
                    borderColor: 'rgba(0,0,255,1)',
                    borderWidth: 0.5,
                    hoverBackgroundColor: 'rgba(0,0,255,0.8)',
                    hoverBorderColor: 'rgba(255,0,0,1)',
                    data: [0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1]
                }
            ]
        };
        componentDidMount() {
            const myChartRef = this.chartRef.current.getContext("2d");
            new Chart(myChartRef, {
                type: 'bar',
                data: this.data,
                options: this.options
            })
        }
        render() {
            return (
                <Grid item>
                    <canvas className="LearningChart" ref={this.chartRef} />
                </Grid>
            )
        }
    })
);

export default Graph;

