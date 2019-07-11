import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Moment from "moment";
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';

function countValues(dateArray) {
    const datesOnly = dateArray.filter(Moment.isMoment);
    let result = {}, i = datesOnly.length, tempCount;
    while (i--) { // iterate from back to forward
        tempCount = result[datesOnly[i]]; // get the current count of this date
        result[datesOnly[i]] = tempCount ? tempCount + 1 : 1;
    }
    return result;
}

const Graph = inject('store')(
    observer(class Graph extends Component {
        render() {

            const dateAxis = this.props.store.schoolYearDateArray.map(
                (momentObj) => {
                    return momentObj.format('YYYY-MM-DD 00:00:00')
                })

            const dateCounts = (() => {
                let defaultCounts = new Array(dateAxis.length).fill(0);
                const counts = countValues(this.props.store.learningData.datesMet);
                for(let date in counts){
                    let reformatted = Moment(date).format('YYYY-MM-DD 00:00:00')
                    defaultCounts[dateAxis.indexOf(reformatted)] = counts[date]
                }
                return defaultCounts
            })()

            const cumulativeDateCounts = dateCounts.map((count, index)=>{
                return dateCounts.slice(0,index+1).reduce((a,b)=>a+b) 
            })

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
                    x: dateAxis,
                    y: cumulativeDateCounts,
                    yaxis: 'y2',
                    xaxis: 'x2',
                    name: 'Cumulative Objectives',
                    marker: {color: 'green'},
                    type: 'line'
                }
            ]

            const objectiveRange = this.props.store.learningData.datesMet.filter((date)=>date!=="").length

            const stackedBarLayout = {
                title: [this.props.store.name, this.props.store.grade, this.props.store.subject].join(' - '), barmode: 'stack',
                xaxis: {
                    title: {
                        text: "Objective Number"
                    },
                    range: [0,objectiveRange*1.1]
                },
                yaxis: {
                    title: {
                        text: "Learn Units to Meet an Objective"
                    },
                    range: [0, 30]
                },
                yaxis2: {
                    title: 'Cumulative Objectives Met',
                    overlaying: 'y',
                    side: 'right',
                    range: [0, objectiveRange*1.1]
                },
                xaxis2: {
                    overlaying: 'x',
                    side: 'top',
                    type: "date",
                    tickformat: '%b',
                    nticks: 13,
                    range: [
                        this.props.store.schoolYear.start.format('YYYY-MM-DD 00:00:00'),
                        this.props.store.schoolYear.end.format('YYYY-MM-DD 00:00:00')
                    ]
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