import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

import moment from 'moment';
import {strings} from '../../locales/i18n';

class TimePick extends Component {
    constructor(props){
        super(props)
        this.state = {
            time: props.initTime ? props.initTime : moment()
        }
    }

    render() {
        return (
            <DatePicker
                style={{width: 200}}
                date={this.state.time}
                mode="time"
                placeholder={strings('week_screen.select_time')}
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
                onDateChange={(time) => {
                    this.props.changeTime(time);
                    this.setState({time})
                }}
            />)
    }
}

export default TimePick;