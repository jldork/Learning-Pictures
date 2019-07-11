import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const DateForm = inject('store')(
    observer(class Content extends Component {
        render() {
            return (
                <Paper square={true} className="form-container">
                    <FormControl className="date-form" noValidate>
                    <TextField
                            label="Name"
                            value={this.props.store.name}
                            className="name"
                            onChange={this.props.store.setName}
                        />
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
                        <TextField
                            label="School Start"
                            type="date"
                            value={this.props.store.schoolYear.start.format('YYYY-MM-DD')}
                            className="school-start"
                            onChange={this.props.store.setSchoolStart}
                        />
                        <TextField
                            label="School End"
                            type="date"
                            value={this.props.store.schoolYear.end.format('YYYY-MM-DD')}
                            className="school-end"
                            onChange={this.props.store.setSchoolEnd}
                        />
                    </FormControl>
                </Paper>
            )
        }
    }));

export default DateForm;