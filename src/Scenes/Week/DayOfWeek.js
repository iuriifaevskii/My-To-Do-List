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
import * as Progress from 'react-native-progress';
import moment from 'moment';

import {
    colors as colorConst,
} from '../../constants';

import ListOfTasks from './ListOfTasks';

class DayOfWeek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTasks: false,
            daysInAsyncStorage: props.daysInAsyncStorage ? props.daysInAsyncStorage : null
        };
    }

    getTaskProgress() {
        const countCompleted = this.props.daysInAsyncStorage
            ? this.props.daysInAsyncStorage.tasks.filter(task => task.isCompleted).length
            : 0;
        const allTasks = this.props.daysInAsyncStorage
            ? this.props.daysInAsyncStorage.tasks.length
            : 1;

        return {
            procent: (countCompleted*100/allTasks).toFixed(),
            progressProcent: (countCompleted/allTasks).toFixed(1)
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({listOfTasks: !this.state.listOfTasks})} style={styles.dayRow}>
                    <View style={[styles.Col, styles.dayCol,
                        this.state.listOfTasks
                        ?
                        {borderBottomLeftRadius: 0}
                        :
                        {borderBottomLeftRadius: 6}
                        ]}>
                        <Text style={styles.dayText}>
                            {moment(this.props.day).format('Do dddd')}
                        </Text>
                        <Text style={styles.dayYearText}>
                            {moment(this.props.day).format('MMM YYYY')}
                        </Text>
                    </View>
                    <View style={[styles.Col, styles.progressCol]}>
                        <Text style={styles.progressText}>Progress Status</Text>
                        <Progress.Bar
                            progress={+this.getTaskProgress().progressProcent}
                            width={130}
                            height={10}
                        />
                        <Text style={styles.progressText}>
                            {this.getTaskProgress().procent}%
                        </Text>
                    </View>
                    <View style={[styles.Col, styles.addCol, 
                        this.state.listOfTasks
                        ?
                        {borderBottomRightRadius: 0}
                        :
                        {borderBottomRightRadius: 6}
                        ]}>
                        <TouchableOpacity
                            style={{backgroundColor:'red',height:40,width:40}} 
                            onPress={() => this.props.createTask(this.props.day)} />
                            
                        <TouchableOpacity/>
                    </View>
                </TouchableOpacity>
                {
                    this.state.listOfTasks
                    ?
                    <ListOfTasks
                        daysInAsyncStorage={this.props.daysInAsyncStorage ? this.props.daysInAsyncStorage : []}
                        onCheckChange={this.props.onCheckChange}
                        deleteTask={this.props.deleteTask}
                    />
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        marginTop: 8,
        marginHorizontal: 8,
    },
    dayText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18
    },
    dayYearText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 12
    },
    Col: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    dayCol: {
        flex: 3,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        justifyContent: 'center',
        backgroundColor: 'powderblue'
    },
    progressCol: {
        flex: 3,
        justifyContent: 'center',
        backgroundColor: 'skyblue'
    },
    progressText: {
        textAlign: 'center',
    },
    addCol: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'steelblue',
        borderTopRightRadius: 6,
        
    }
});

export default DayOfWeek;