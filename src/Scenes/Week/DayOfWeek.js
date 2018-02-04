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
    Modal,
    TextInput
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
            modalVisible: false,
            title: '',
            description: '',
            daysInAsyncStorage: props.daysInAsyncStorage ? props.daysInAsyncStorage : null
        };
    }

    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    toggleModalCreate = () => {
        this.setState({modalVisible: !this.state.modalVisible})
        this.props.createTask(
            this.props.day,
            this.state.title,
            this.state.description
        );
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
                            onPress={() => this.toggleModal()} />
                            
                        <TouchableOpacity/>
                    </View>
                </TouchableOpacity>
                {
                    this.state.listOfTasks
                    ?
                    <ListOfTasks
                        daysInAsyncStorage={this.props.daysInAsyncStorage ? this.props.daysInAsyncStorage : []}
                        deleteTask={this.props.deleteTask}
                        editTask={this.props.editTask}
                    />
                    :
                    null
                }

                <View style={styles.modalWrap}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => {}}
                        visible={this.state.modalVisible}>
                        <View style={styles.modal}>
                            <Text style={styles.headerModalText}>Create your task</Text>
                            <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                                <TextInput 
                                    name="title"
                                    style={{height: 40}}
                                    placeholder="Title"
                                    placeholderTextColor='#C7C7CD'
                                    onChangeText={(title) => this.setState({title})}
                                    returnKeyType={"next"}
                                    autoFocus = {true}
                                    onSubmitEditing={(event) => { 
                                        this.refs.descriptionRef.focus(); 
                                    }}
                                />
                                <TextInput 
                                    name="description"
                                    style={{height: 150}}
                                    placeholder="Description"
                                    ref="descriptionRef"
                                    multiline = {true}
                                    numberOfLines = {4}
                                    placeholderTextColor='#C7C7CD'
                                    onChangeText={(description) => this.setState({description})}
                                />
                            </ScrollView>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    onPress={this.toggleModal}>
                                    <Text style={styles.button}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.toggleModalCreate}>
                                    <Text style={styles.button}>Create Task</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
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
        paddingBottom: 4,
        fontSize: 13
    },
    progressProcentText: {
        textAlign: 'center',
    },
    addCol: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'steelblue',
        borderTopRightRadius: 6,
        alignItems: 'center',
    },
    modalWrap: {
        overflow: 'visible'
    },
    headerModalText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        padding: 9
    },
    modalBody: {
        padding: 9
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 20,
        flex: 1,
        marginHorizontal: 50,
        marginTop: 50,
        maxHeight: 300
    },
    buttons: {
        borderTopWidth: 1,
        borderTopColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 9,
    },
    button: {
        color: 'blue',
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        marginLeft: 25,
        marginRight: 25
    },
});

export default DayOfWeek;