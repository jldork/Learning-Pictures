import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import TextField from '@material-ui/core/TextField';

const DateForm = inject('store')(
    observer(class Content extends Component {
        render() {
            return (
                <form className="date-form" noValidate>
                    <TextField
                        id="date"
                        label="School Start"
                        type="date"
                        defaultValue={this.props.store.schoolYear.start.format('YYYY-MM-DD')}
                        className="school-start"
                        onChange={this.props.store.setSchoolStart}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="School End"
                        type="date"
                        defaultValue={this.props.store.schoolYear.end.format('YYYY-MM-DD')}
                        className="school-end"
                        onChange={this.props.store.setSchoolEnd}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            )
        }
    }));

export default DateForm;