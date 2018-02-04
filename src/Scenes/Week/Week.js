import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    ScrollView,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import {
    colors as colorConst,
} from '../../constants';

import {
    getDays,
    getDayByDate
} from '../../asyncStorage/data';


import DayOfWeek from './DayOfWeek';
import DatePick from './DatePick';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfSevenDays: this.generateArrayOfSevenDays(new Date().toISOString().split('T')[0]),
            daysInAsyncStorage: []
        };
    }

    componentDidMount() {
        const daysInAsyncStorage = getDays();
        if (daysInAsyncStorage) {
            this.setState({ daysInAsyncStorage });
        }
    }

    createTask = (uniqueDate) => {
        console.log('create uniqueDate', uniqueDate);
    }

    onCheckChange = (uniqueDate, taskId, checked) => {
        console.log('checked uniqueDate:',uniqueDate)
        console.log('checked taskId:',taskId)
        console.log('checked status:',checked)
    }

    deleteTask = (uniqueDate, taskId) => {
        console.log('delete uniqueDate:', uniqueDate);
        console.log('delete taskId:', taskId);
    }
    
    changeDate = (date) => {
        this.setState({arrayOfSevenDays: this.generateArrayOfSevenDays(date)});
    }

    generateArrayOfSevenDays(firstValue) {
        var monday = moment(firstValue ? `${firstValue}T00:00:00` : new Date())
            .startOf('isoWeek')//moment().startOf('week');
            .format("YYYY-MM-DDTHH:mm:ss");

		let newFirstValue = moment(monday);
		const arrayOfSevenDays = [];
		
		for (let i = 0; i < 7; ++i) {
			if (i > 0) {
				newFirstValue.add(1, 'days')
			}
			let future = newFirstValue.clone();
			arrayOfSevenDays.push(future._d);
        }
        
		return arrayOfSevenDays;
	}

    render() {
        return (
            <ScrollView style={styles.container}>
                <DatePick changeDate={this.changeDate}/>
                {
                    this.state.arrayOfSevenDays.map((day, i) => {
                        return <DayOfWeek
                            day={day}
                            daysInAsyncStorage={
                                _.some(this.state.daysInAsyncStorage, {date: moment(day).format("YYYY-MM-DDTHH:mm:ss")})
                                ?
                                getDayByDate(moment(day).format("YYYY-MM-DDTHH:mm:ss"))
                                :
                                null
                            }
                            key={i}
                            onCheckChange={this.onCheckChange}
                            deleteTask={this.deleteTask}
                            createTask={this.createTask}
                        />
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: height - 50,
        width: width,
    },
    
});

export default Week;