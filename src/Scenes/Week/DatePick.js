import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

import moment from 'moment';
import {strings} from '../../locales/i18n';

class DatePick extends Component {
    constructor(props){
        super(props)
        this.state = {date: moment()}
    }

    render() {
        return (
            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder={strings('week_screen.select_date')}
                format="DD/MM/YYYY"
                minDate="01/01/2009"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        marginLeft: 0
                    },
                    dateInput: {
                    }
                }}
                onDateChange={(date) => {
                    this.props.changeDate(date);
                    this.setState({date})
                }}
            />)
    }
}

export default DatePick;