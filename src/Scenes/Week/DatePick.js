import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

class DatePick extends Component {
    constructor(props){
        super(props)
        this.state = {date:"2016-05-15"}
    }

    render() {
        return (
            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
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