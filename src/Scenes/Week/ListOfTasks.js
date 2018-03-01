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
    CheckBox 
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import {
    colors as colorConst,
} from '../../constants';

import TaskRow from './TaskRow';

class ListOfTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysInAsyncStorage: []
        };
    }

    componentDidMount() {
        if (this.props.daysInAsyncStorage) {
            this.setState({daysInAsyncStorage: this.props.daysInAsyncStorage});
        }
    }

    sortTasks(taskArray) {
        const array = !_.isEmpty(taskArray) ? taskArray.sort((a, b) => {
            
            if(moment(a.time, 'HH:mm').format() < moment(b.time, 'HH:mm').format()) return -1;
            if(moment(a.time, 'HH:mm').format() > moment(b.time, 'HH:mm').format()) return 1;
            
            if(!a.time || !b.time) {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
            }

            if(!a.title || !b.title) {
                if(a.id < b.id) return -1;
                if(a.id > b.id) return 1;
            }

            return 0;

        }) : [];
        return array
    }

    componentWillReceiveProps(newProps) {
        if (!_.isEqual(this.props.daysInAsyncStorage, newProps.daysInAsyncStorage)) {
            this.setState({daysInAsyncStorage: newProps.daysInAsyncStorage})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    !_.isEmpty(this.props.daysInAsyncStorage) && this.state.daysInAsyncStorage.tasks
                    ?
                    this.sortTasks(this.state.daysInAsyncStorage.tasks)
                        .map((task, i) => <TaskRow 
                            key={task.id}
                            date={this.state.daysInAsyncStorage.date}
                            task={task}
                            deleteTask={this.props.deleteTask}
                            editTask={this.props.editTask}
                    />)
                    :
                    <Text style={styles.noTaskText}>No tasks yet</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A0A3A3',
        marginHorizontal: 8,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6
    },
    taskRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    textCol: {
        textAlign: 'center',
        justifyContent: 'center',
        flex: 5,
        marginVertical: 5
    },
    buttonsCol: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    noTaskText: {
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center'
    }

});

export default ListOfTasks;