import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const DateForm = inject('store')(
    observer(class Content extends Component {
        render() {
            return (
                <Paper square={true} className="form-container">
                    <Grid container>
                        <FormControl className="date-form" noValidate>
                            <h3 className="form-title" >Controls</h3>
                            <TextField
                                label="Name"
                                value={this.props.store.name}
                                className="student-name"
                                onChange={this.props.store.setName}
                            />
                            <Grid container alignContent="space-between">
                                <TextField
                                    label="Grade"
                                    value={this.props.store.grade}
                                    className="grade"
                                    onChange={this.props.store.setGrade}
                                />
                                <TextField
                                    label="Subject"
                                    value={this.props.store.subject}
                                    className="subject"
                                    onChange={this.props.store.setSubject}
                                />
                            </Grid>
                            <Grid container >
                                    <TextField
                                        label="School Start"
                                        type="date"
                                        value={this.props.store.schoolYear.start.format('YYYY-MM-DD')}
                                        className="school-date"
                                        onChange={this.props.store.setSchoolStart}
                                    />
                                    <TextField
                                        label="School End"
                                        type="date"
                                        value={this.props.store.schoolYear.end.format('YYYY-MM-DD')}
                                        className="school-date"
                                        onChange={this.props.store.setSchoolEnd}
                                    />
                            </Grid>
                        </FormControl>
                    </Grid>
                </Paper>
            )
        }
    }));

export default DateForm;