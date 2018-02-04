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

    createTask = (uniqueDate, title, description) => {
        console.log('create uniqueDate', uniqueDate);
        console.log('create title', title);
        console.log('create description', description);
    }

    editTask = (date, taskId, newTitle, newDescription, checked) => {
        console.log('editTask date:',date)
        console.log('editTask taskId:',taskId)
        console.log('editTask newTitle:',newTitle)
        console.log('editTask newDescription:',newDescription)
        console.log('editTask checked:',checked)
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
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
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
                            deleteTask={this.deleteTask}
                            createTask={this.createTask}
                            editTask={this.editTask}
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