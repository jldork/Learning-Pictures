import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Moment from "moment";
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';

const Graph = inject('store')(
    observer(class Graph extends Component {
        render() {
            function getColumn(df, colName){
                return df.select(colName).toArray().map((row)=>row[0])
            };

            const dateAxis = this.props.store.schoolYearDateArray.map(
                (momentObj) => {
                    return momentObj.format('YYYY-MM-DD 00:00:00')
                })

            const dateCounts = (() => {
                let defaultCounts = new Array(dateAxis.length).fill(0);
                let datesMetDf = getColumn(this.props.store.learningData, 'DATES MET')

                function countValues(dateArray) {
                    const datesOnly = dateArray.filter(Moment.isMoment);
                    let result = {}, i = datesOnly.length, tempCount;
                    while (i--) { // iterate from back to forward
                        tempCount = result[datesOnly[i]]; // get the current count of this date
                        result[datesOnly[i]] = tempCount ? tempCount + 1 : 1;
                    }
                    return result;
                }

                const dateCounts = countValues(datesMetDf)
                
                for(let date in dateCounts){
                    let reformatted = Moment(date).format('YYYY-MM-DD 00:00:00')
                    defaultCounts[dateAxis.indexOf(reformatted)] = dateCounts[date]
                }
                return defaultCounts
            })()

            const cumulativeDateCounts = dateCounts.map((count, index)=>{
                return dateCounts.slice(0,index+1).reduce((a,b)=>a+b) 
            })

            const graphData = this.props.store.learningData;
            const objectives = getColumn(graphData,'OBJECTIVE'); 

            let objective_data = [
                {
                    x: objectives,
                    y: getColumn(graphData,'LESSON LU'),
                    type: 'bar',
                    marker: { color: 'black' },
                    name: 'Lesson LU'
                },
                {
                    x: objectives,
                    y: getColumn(graphData,'TACTIC'),
                    type: 'bar',
                    marker: { color: 'red' },
                    name: 'Tactic'
                },
                {
                    x: objectives,
                    y: getColumn(graphData,'PROTOCOL'),
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

            const objectiveRange = graphData.select('LESSON LU', 'TACTIC','PROTOCOL').toArray().reduce((max, row)=>{
                const LU = parseInt(row[0]) || 0
                const TA = parseInt(row[1]) || 0
                const PR = parseInt(row[2]) || 0
                const total = LU + TA + PR
                return Math.max(total, max || 0)
            })

            const totalObjectives = getColumn(graphData,'LESSON LU').filter(lu => lu > 0)
            
            const stackedBarLayout = {
                title: [this.props.store.name, this.props.store.grade, this.props.store.subject].join(' - '), barmode: 'stack',
                xaxis: {
                    title: {
                        text: "Objective Number"
                    },
                    range: [0,totalObjectives.length*1.1]
                },
                yaxis: {
                    title: {
                        text: "Learn Units to Meet an Objective"
                    },
                    range: [0, objectiveRange*1.2]
                },
                yaxis2: {
                    title: 'Cumulative Objectives Met',
                    overlaying: 'y',
                    side: 'right',
                    range: [0, Math.max(...cumulativeDateCounts)*1.2]
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