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

import {
    colors as colorConst,
} from '../../constants';

import TaskRow from './TaskRow';

class ListOfTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysInAsyncStorage: props.daysInAsyncStorage
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    !_.isEmpty(this.props.daysInAsyncStorage)
                    ?
                    this.state.daysInAsyncStorage.tasks
                        .map((task, i) => <TaskRow 
                            key={i}
                            date={this.state.daysInAsyncStorage.date}
                            task={task}
                            deleteTask={this.props.deleteTask}
                            editTask={this.props.editTask}
                    />)
                    :
                    <Text>No tasks yet</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        marginHorizontal: 8,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6
    },
    taskRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'red'
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
    }

});

export default ListOfTasks;