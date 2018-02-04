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
    TextInput
} from 'react-native';

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

    toggleModalEdit = () => {console.log(this.props.task)
        this.setState({modalVisible: !this.state.modalVisible})
        this.props.editTask(
            this.props.date,
            this.props.task.id,
            this.state.title,
            this.state.description,
            !this.state.checked
        );
    }

    render() {
        if(this.state.isModalOpen) {
            Alert.alert(
                `Do you want to delete a task:\n${this.props.task.title}?`,
                null,
                [
                    {text: 'CANCEL', onPress: () => this.setState({isModalOpen: false})},
                    {text: 'DELETE', onPress: () => {
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
                        style={{backgroundColor: 'gray',height:40,width:40}}
                        onPress={() => this.toggleModal()}
                    />
                    <TouchableOpacity
                        style={{backgroundColor: 'green',height:40,width:40}}
                        onPress={() => this.setState({isModalOpen: !this.state.isModalOpen})}
                    />
                        
                    <TouchableOpacity/>
                </View>

                <View style={styles.modalWrap}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => {}}
                        visible={this.state.modalVisible}>
                        <View style={styles.modal}>
                            <Text style={styles.headerModalText}>Edit your task</Text>
                            <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                                <TextInput 
                                    name="title"
                                    style={{height: 40}}
                                    placeholder="Title"
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
                                    placeholder="Description"
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
                                    <Text style={styles.button}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.toggleModalEdit}>
                                    <Text style={styles.button}>Save</Text>
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
        backgroundColor: 'red'
    },
    textCol: {
        justifyContent: 'center',
        flex: 5,
        marginVertical: 5
    },
    buttonsCol: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
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

export default TaskRow;