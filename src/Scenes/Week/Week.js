import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    ScrollView,
    Platform,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import uuidv1 from 'uuid/v1'
import {strings} from '../../locales/i18n';

import {
    colors as colorConst,
} from '../../constants';

import {
    getDays,
    setDays,
} from '../../asyncStorage/data';

import {
    getWeekStart,
} from '../../asyncStorage/settings';

import days from '../../jsons/days';

import DayOfWeek from './DayOfWeek';
import DatePick from './DatePick';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfSevenDays: [],
            daysInAsyncStorage: [],
            weekSettings: null
        };
    }

    async componentDidMount() {
        const weekSettings = !_.isEmpty(await getWeekStart()) ? await getWeekStart() : null;
        if(weekSettings) {
            this.setState({weekSettings: weekSettings ? weekSettings.toggled : false})
        } else {
            this.setState({weekSettings: this.state.weekSettings})
        }
        const daysInAsyncStorage = !_.isEmpty(await getDays()) ? await getDays() : [];
        if (daysInAsyncStorage) {
            setDays(daysInAsyncStorage);
            this.setState({ daysInAsyncStorage });
        }
        this.setState({arrayOfSevenDays: this.generateArrayOfSevenDays()})
    }

    createTask = (uniqueDate, title, description) => {
        const daysInAsyncStorage = this.state.daysInAsyncStorage;
        
        const task = {
            id: uuidv1(),
            title,
            description,
            isCompleted: false,
        };
        if (this.taskOnDate(uniqueDate)) {
            const oldDay = this.taskOnDate(uniqueDate);
            oldDay.tasks.push(task);
        } else {
            daysInAsyncStorage.push({
                date: uniqueDate,
                tasks: [task]
            });
        }
        if (daysInAsyncStorage) {
            setDays(daysInAsyncStorage);
            this.setState({ daysInAsyncStorage });
        }
    }

    editTask = (date, taskId, newTitle, newDescription, checked) => {
        const daysInAsyncStorage = this.state.daysInAsyncStorage.filter(item => item.date !== date);
        const task = {
            id: taskId,
            title: newTitle,
            description: newDescription,
            isCompleted: checked,
        };
        const oldDay = this.taskOnDate(date);
        const tasks = oldDay.tasks.filter(task => task.id !== taskId);
        tasks.push(task);
        daysInAsyncStorage.push({
            date,
            tasks
        });
        if (daysInAsyncStorage) {
            setDays(daysInAsyncStorage);
            this.setState({ daysInAsyncStorage });
        }
    }

    deleteTask = (uniqueDate, taskId) => {
        const daysInAsyncStorage = this.state.daysInAsyncStorage.filter(item => item.date !== uniqueDate);
        const oldDay = this.taskOnDate(uniqueDate);
        const tasks = oldDay.tasks.filter(task => task.id !== taskId);
        daysInAsyncStorage.push({
            date: uniqueDate,
            tasks
        });
        if (daysInAsyncStorage) {
            setDays(daysInAsyncStorage);
            this.setState({ daysInAsyncStorage });
        }
    }
    
    changeDate = (date) => {
        this.setState({arrayOfSevenDays: this.generateArrayOfSevenDays(date)});
    }

    momentOverrideMethod() {
        moment.fn.weekdayWithStartWeekday = function (targetWeekday, startDayOfWeek) {
            let weekday = (this.day() + 7 - startDayOfWeek) % 7;
            return this.add(targetWeekday - weekday, 'd');
        }
    }
    generateArrayOfSevenDays(firstValue) {
        this.momentOverrideMethod();
        
        const startDay = firstValue ? moment(firstValue, 'DD/MM/YYYY') : moment();
        let monday = startDay.weekdayWithStartWeekday(0, this.state.weekSettings ? 0 : 6)
		let newFirstValue = moment(monday);
		const arrayOfSevenDays = [];
		
		for (let i = 0; i < 7; ++i) {
			arrayOfSevenDays.push(newFirstValue.add(1, 'days').format('YYYY-MM-DD'));
        }
		return arrayOfSevenDays;
    }
    
    taskOnDate(day) {
        const isDate = this.state.daysInAsyncStorage
            .filter(item => moment(item.date).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD'))[0];
        return isDate;
    }

    render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 6}}>
                    <View style={{paddingRight: 3}}>
                        <Text style={{fontSize:17, color: 'black'}}>{strings('week_screen.select_date2')}:</Text>
                    </View>
                    <View style={{paddingLeft: 3}}>
                        <DatePick changeDate={this.changeDate}/>
                    </View>
                </View>
                {
                    this.state.arrayOfSevenDays.map((day, i) => {
                        return <DayOfWeek
                            day={day}
                            daysInAsyncStorage={this.taskOnDate(day)}
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