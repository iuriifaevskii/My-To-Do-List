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
    TextInput,
    AsyncStorage,
    Keyboard
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import moment from 'moment';
import {strings} from '../../locales/i18n';

import {
    colors as colorConst,
    routes as routeConst
} from '../../constants';

import {
    getPassword,
    setPassword,
    getSecret,
    setSecret,
    removePassword
} from '../../asyncStorage/password';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class EnterPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisibleSecret: false,
            initPassword: null,
            newPassword: '',
            confirmPass: '',
            secretPhrase: '',
            currentSecretPhrase: '',
            secretTip: '',
            isFogortPassword: false
        };
    }

    async componentDidMount() {
        const passwordObject = await getPassword();
        const secret = await getSecret();
        if (passwordObject) {
            this.setState({initPassword: passwordObject.password});
        } else {
            this.setState({modalVisible: !this.state.modalVisible})
        }

        if (secret) {
            this.setState({secretTip: secret.secretTip});
            this.setState({currentSecretPhrase: secret.secretPhrase});
        }
    }

    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
        this.setState({newPassword: ''});
        this.setState({confirmPass: ''});
    }

    toggleModalSecret = () => {
        this.setState({modalVisibleSecret: !this.state.modalVisibleSecret})
        this.setState({secretPhrase: ''});

        if (!this.state.currentSecretPhrase) {
            this.setState({newPassword: ''});
            this.setState({confirmPass: ''});
            this.setState({secretTip: ''});
            removePassword();
        }
    }

    toggleModalCreate = async () => {
        this.setState({modalVisible: !this.state.modalVisible})

        const passwordObject = {
            password: this.state.newPassword
        }
        setPassword(passwordObject)
        this.setState({initPassword: this.state.newPassword});
        
        if (!this.state.currentSecretPhrase) {
            this.setState({modalVisibleSecret: !this.state.modalVisibleSecret})
        }
    }

    toggleModalSecretPhrase = () => {
        const {secretTip, secretPhrase, currentSecretPhrase} = this.state;
        const secret = {
            secretTip,
            secretPhrase
        }
        if (currentSecretPhrase && currentSecretPhrase === secretPhrase) {
            this.resetPassword();
            this.setState({modalVisible: !this.state.modalVisible})
        } else {
            setSecret(secret);
            this.setState({secretTip: secret.secretTip});
            this.setState({currentSecretPhrase: secret.secretPhrase});
            this.setState({secretPhrase: ''})
        }
        
        this.setState({modalVisibleSecret: !this.state.modalVisibleSecret})
    }

    resetPassword = async () => {
        this.setState({newPassword: ''});
        this.setState({confirmPass: ''});
        this.setState({secretPhrase: ''});
        this.setState({initPassword: ''});
        removePassword();
    }

    isSuccessPassword() {
        return this.state.newPassword !== this.state.confirmPass||this.state.newPassword.length===0;
    }

    isSecretPhraseValid() {
        if (this.state.currentSecretPhrase) {
            return this.state.secretPhrase !== this.state.currentSecretPhrase
        } else {
            return this.state.secretPhrase.length < 3 || this.state.secretTip.length < 3
        }
        
    }

    forgotPassword = () => {
        this.setState({isFogortPassword: !this.state.isFogortPassword});
        this.setState({modalVisibleSecret: !this.state.modalVisibleSecret});
    }

    goToContent = async (password) => {
        const passwordObject = await getPassword();
        if (passwordObject && password === passwordObject.password) {
            Keyboard.dismiss();
            Actions[routeConst.WEEK]();
        }
    }

    renderPasswordModal() {
        return <View style={styles.modalWrap}>
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {}}
            visible={this.state.modalVisible}>
            <View style={styles.modal}>
                <Text style={styles.headerModalText}>{strings('password_screen.create_password')}</Text>
                <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                    <TextInput 
                        name="newPassword"
                        style={styles.fieldModal}
                        placeholder={strings('password_screen.password')}
                        placeholderTextColor='#C7C7CD'
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        returnKeyType={"next"}
                        autoFocus={true}
                        secureTextEntry={true}
                        maxLength={6}
                        keyboardType={'numeric'}
                        onSubmitEditing={(event) => { 
                            this.refs.confirmPassRef.focus(); 
                        }}
                    />
                    <TextInput 
                        name="confirmPass"
                        style={styles.fieldModal}
                        placeholder={strings('password_screen.confirm_password')}
                        ref="confirmPassRef"
                        placeholderTextColor='#C7C7CD'
                        secureTextEntry={true}
                        maxLength={6}
                        keyboardType={'numeric'}
                        onChangeText={(confirmPass) => this.setState({confirmPass})}
                    />
                    <Text style={
                        this.isSuccessPassword()
                        ? styles.errorInfo
                        : styles.successInfo}>
                        {this.isSuccessPassword()
                        ? strings('password_screen.dose_not_match')
                        : strings('password_screen.success_password')}
                    </Text>
                </ScrollView>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={this.toggleModal}>
                        <Text style={styles.button}>{strings('password_screen.exit')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.isSuccessPassword() ? null : this.toggleModalCreate}>
                        <Text style={[styles.button, {color: this.isSuccessPassword() ? 'gray' : 'blue'}]}>{strings('password_screen.create')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
    }

    renderSecretModal() {
        return <View style={styles.modalWrap}>
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {}}
            visible={this.state.modalVisibleSecret}>
            <View style={styles.modalSecretPhrase}>
                <Text style={styles.headerModalText}>{strings('password_screen.secret_phrase')}</Text>
                <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                    {this.state.currentSecretPhrase
                    ?
                    <Text style={styles.secretText}>{strings('password_screen.secret_tip')}: {this.state.secretTip}</Text>
                    :
                    <TextInput 
                        name="secretTip"
                        style={styles.fieldModal}
                        placeholder={strings('password_screen.secret_tip')}
                        placeholderTextColor='#C7C7CD'
                        onChangeText={(secretTip) => this.setState({secretTip})}
                        returnKeyType={"next"}
                        autoFocus={true}
                        maxLength={10}
                        onSubmitEditing={(event) => { 
                            this.refs.secretPhraseRef.focus(); 
                        }}
                    />
                    }
                    <TextInput 
                        name="secretPhrase"
                        style={styles.fieldModal}
                        placeholder={strings('password_screen.secret_phrase')}
                        placeholderTextColor='#C7C7CD'
                        ref={"secretPhraseRef"}
                        onChangeText={(secretPhrase) => this.setState({secretPhrase})}
                        returnKeyType={"next"}
                        maxLength={10}
                    />
                    <Text style={
                        this.isSecretPhraseValid()
                        ? styles.errorInfo
                        : styles.successInfo}>
                        {this.isSecretPhraseValid()
                        ? this.state.currentSecretPhrase ? strings('password_screen.dose_not_match') : strings('password_screen.minimum_3_symbols')
                        : strings('password_screen.valid_secret')}
                    </Text>
                </ScrollView>
                <View style={styles.buttonsSecretPhrase}>
                    <TouchableOpacity
                        onPress={this.toggleModalSecret}>
                        <Text style={styles.button}>{strings('password_screen.exit')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.isSecretPhraseValid() ? null : this.toggleModalSecretPhrase}>
                        <Text style={[styles.button, {color: this.isSecretPhraseValid() ? 'gray' : 'blue'}]}>{strings('password_screen.save')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
    }

    render() {
        return <View style={styles.main}>
            <View style={styles.container}>
                
                {this.renderPasswordModal()}
                {this.renderSecretModal()}

                <View style={styles.containerWrap}>
                    <View style={styles.boxEnter}>
                        <Text style={styles.textInput}>
                        {strings('password_screen.enter_password')}
                        </Text>
                    </View>
                    <View style={styles.boxPass}>
                        <TextInput 
                            style={styles.textInput}
                            secureTextEntry={true}
                            maxLength={6}
                            keyboardType={'numeric'}
                            autoFocus={!!this.state.initPassword}
                            onChangeText={(password) => {
                                this.goToContent(password);
                            }}
                        />
                    </View>
                    {this.state.initPassword && this.state.currentSecretPhrase
                    ?
                    <TouchableOpacity onPress={() => this.forgotPassword()}>
                        <Text>{strings('password_screen.forgot_password')}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.toggleModal()}>
                        <Text>{strings('password_screen.create_password_secret_phrase')}</Text>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#289fda',
    },
    containerWrap: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    boxEnter: {
        marginBottom: 10
    },
    boxPass: {
        width: 100,
        marginBottom: 10
    },
    textInput: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
    },
    modalWrap: {
        overflow: 'visible'
    },
    headerModalText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        paddingTop: 9
    },
    modalBody: {
        paddingBottom: 9,
        width: 150,
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
        maxHeight: 200,
        alignItems: 'center',
    },
    modalSecretPhrase: {
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
        maxHeight: 210,
        alignItems: 'center',
    },
    secretText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 15
    },
    fieldModal: {
        textAlign: 'center',
        height: 50
    },
    errorInfo: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
    },
    successInfo: {
        color: 'green',
        fontSize: 12,
        textAlign: 'center',
    },
    buttons: {
        borderTopWidth: 1,
        borderTopColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 9,
    },
    buttonsSecretPhrase: {
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

export default EnterPassword;