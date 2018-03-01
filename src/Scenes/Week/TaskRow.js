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
    CheckBox,
    Modal,
    TextInput,
    Image,
    Switch,
} from 'react-native';
import moment from 'moment';
import {strings} from '../../locales/i18n';

import {
    colors as colorConst,
} from '../../constants';

import TimePick from './TimePick';

class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalVisible: false,
            title: props.task ? props.task.title : '',
            description: props.task ? props.task.description : '',
            checked: this.props.task.isCompleted,
            task: props.task,
            time: props.task ? props.task.time : null,
            toggledTime: !!(props.task && props.task.time)
        };
    }
    
    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    toggleModalEdit = () => {
        this.setState({modalVisible: !this.state.modalVisible})
        this.props.editTask(
            this.props.date,
            this.props.task.id,
            this.state.title,
            this.state.description,
            this.state.checked,
            this.state.time
        );
    }

    changeTime = (time) => {
        this.setState({time});
    }

    onTogledTimeChange = () => {
        if (!this.state.toggledTime) {
            this.setState({time: this.state.time ? this.state.time : moment().format('HH:mm')});
        } else {
            this.setState({time: null});
        }
        this.setState({toggledTime: !this.state.toggledTime});
    }

    cutString = (str, maxLength) => {
        return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
    }

    render() {
        if(this.state.isModalOpen) {
            Alert.alert(
                `${strings('week_screen.do_you_want_to_delete_task')}: ${this.props.task.title}?`,
                null,
                [
                    {text: strings('week_screen.cancel'), onPress: () => this.setState({isModalOpen: false})},
                    {text: strings('week_screen.delete'), onPress: () => {
                    this.setState({isModalOpen: false}), this.props.deleteTask(
                        this.props.date,
                        this.props.task.id,
                    )}}
                ],
                { onDismiss: () => this.setState({isModalOpen: false}) }
            );
        }

        return (
            <View style={styles.task}>
                <View style={styles.taskRow}>
                    <CheckBox
                        value={this.state.checked}
                        onValueChange={() => {
                            this.setState({checked: !this.state.checked})
                            this.props.editTask(
                                this.props.date,
                                this.props.task.id,
                                this.state.title,
                                this.state.description,
                                !this.state.checked,
                                this.state.time
                            )}}
                    />
                    <View style={styles.textCol}>
                        <Text>
                            {this.cutString(this.props.task.title, 35)}
                        </Text>
                    </View>
                    <View style={styles.buttonsCol}>
                        <TouchableOpacity
                            style={{height:30,width:30}}
                            onPress={() => this.toggleModal()}
                        >
                        <Image
                            style={{width: 30, height: 30}}
                            source={require('./img/edit.png')}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{height:30,width:30}}
                            onPress={() => this.setState({isModalOpen: !this.state.isModalOpen})}
                        >
                        <Image
                            style={{width: 30, height: 30}}
                            source={require('./img/remove.png')}
                        />
                        </TouchableOpacity>
                    </View>
                        
                    <View style={styles.modalWrap}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => {}}
                            visible={this.state.modalVisible}>
                            <View style={styles.modal}>
                                <Text style={styles.headerModalText}>{strings('week_screen.edit_your_task')}</Text>
                                <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                                    <TextInput 
                                        name="title"
                                        style={{height: 40}}
                                        placeholder={strings('week_screen.title')}
                                        placeholderTextColor='#C7C7CD'
                                        onChangeText={(title) => this.setState({title})}
                                        returnKeyType={"next"}
                                        autoFocus = {true}
                                        value={this.state.title}
                                        maxLength={50}
                                        onSubmitEditing={(event) => { 
                                            this.refs.descriptionRef.focus(); 
                                        }}
                                    />
                                    <TextInput 
                                        name="description"
                                        style={{height: this.state.toggledTime ? 100 : 150}}
                                        placeholder={strings('week_screen.description')}
                                        ref="descriptionRef"
                                        multiline = {true}
                                        value={this.state.description}
                                        numberOfLines = {4}
                                        maxLength={200}
                                        placeholderTextColor='#C7C7CD'
                                        onChangeText={(description) => this.setState({description})}
                                    />
                                    <View style={styles.timeBlock}>
                                        <Text>{strings('week_screen.select_time')}</Text>
                                        <Switch
                                            onTintColor={'blue'}
                                            onValueChange={this.onTogledTimeChange}
                                            value={this.state.toggledTime}
                                        />
                                    </View>
                                    {this.state.toggledTime
                                    ?
                                    <View style={styles.timeBlock}>
                                        <TimePick
                                            changeTime={this.changeTime}
                                            initTime={this.state.time}
                                        />
                                    </View>
                                    :
                                    <View/>
                                    }
                                </ScrollView>
                                <View style={styles.buttons}>
                                    <TouchableOpacity
                                        onPress={this.toggleModal}>
                                        <Text style={styles.button}>{strings('week_screen.cancel2')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.toggleModalEdit}>
                                        <Text style={styles.button}>{strings('week_screen.save')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
                <View style={styles.taskRowDescription}>
                    <Text style={[styles.descriptionText, {flex: 5}]}>
                        {this.cutString(this.props.task.description, 150)}
                    </Text>
                    <Text style={[styles.timeText, {flex: 1}]}>
                        {this.props.task.time}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    task: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    taskRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFB291',
        paddingVertical: 3
    },
    taskRowDescription: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFB291',
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    descriptionText: {
        fontSize: 12
    },
    timeText: {
        fontSize: 15,
        textAlign: 'center'
    },
    textCol: {
        justifyContent: 'center',
        flex: 5,
        marginVertical: 5
    },
    buttonsCol: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 3
    },
    modalWrap: {
        overflow: 'visible'
    },
    headerModalText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        paddingTop: 7
    },
    modalBody: {
        padding: 9
    },
    timeBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        marginRight: 25,
    },

});

export default TaskRow;