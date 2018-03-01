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
    Image
} from 'react-native';
import {strings} from '../../locales/i18n';

import {
    colors as colorConst,
} from '../../constants';

class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modalVisible: false,
            title: props.task ? props.task.title : '',
            description: props.task ? props.task.description : '',
            checked: this.props.task.isCompleted,
            task: props.task
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
            this.state.checked
        );
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
                            !this.state.checked
                        )}}
                />
                <View style={styles.textCol}>
                    <Text>
                        {this.props.task.title}
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
                                    onSubmitEditing={(event) => { 
                                        this.refs.descriptionRef.focus(); 
                                    }}
                                />
                                <TextInput 
                                    name="description"
                                    style={{height: 150}}
                                    placeholder={strings('week_screen.description')}
                                    ref="descriptionRef"
                                    multiline = {true}
                                    value={this.state.description}
                                    numberOfLines = {4}
                                    placeholderTextColor='#C7C7CD'
                                    onChangeText={(description) => this.setState({description})}
                                />
                            </ScrollView>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    onPress={this.toggleModal}>
                                    <Text style={styles.button}>{strings('week_screen.cancel')}</Text>
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
        );
    }
}

const styles = StyleSheet.create({
    taskRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFB291',
        paddingVertical: 3
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
        marginRight: 25,
    },

});

export default TaskRow;