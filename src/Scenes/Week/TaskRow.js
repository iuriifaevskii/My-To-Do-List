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

import {
    colors as colorConst,
} from '../../constants';

class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.task.isCompleted,
            task: props.task
        };
    }
    
    render() {
        return (
            <View style={styles.taskRow}>
                <CheckBox
                    value={this.state.checked}
                    onValueChange={() => {
                        this.setState({checked: !this.state.checked})
                        this.props.onCheckChange(
                            this.props.date,
                            this.props.task.id,
                            !this.state.checked
                        )}}
                />
                <View style={styles.textCol}>
                    <Text>
                        {this.props.task.text}
                    </Text>
                </View>
                <View style={styles.buttonsCol}>
                    <TouchableOpacity
                        style={{backgroundColor: 'green',height:40,width:40}}
                        onPress={() => this.props.deleteTask(
                            this.props.date,
                            this.props.task.id,
                        )}
                    />
                        
                    <TouchableOpacity/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    taskRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'red'
    },
    textCol: {
        justifyContent: 'center',
        flex: 5,
        marginVertical: 5
    },
    buttonsCol: {
        flex: 1,
        justifyContent: 'center',
    }

});

export default TaskRow;