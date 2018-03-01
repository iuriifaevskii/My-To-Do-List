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
    Picker,
    Switch,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import _ from 'lodash';
import {strings} from '../../locales/i18n';
import {
    colors as colorConst,
    routes as routeConst
} from '../../constants';

import {
    setWeekStart,
    getWeekStart,
} from '../../asyncStorage/settings';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
    }
    
    openLink = () => {
        Linking.openURL('https://play.google.com/store/apps')
            .catch(err => console.error('An error occurred', err));
    }

    async componentDidMount() {
        const settingsObject = !_.isEmpty(await getWeekStart()) ? await getWeekStart() : null;
        if (settingsObject) {
            this.setState({toggled: settingsObject ? settingsObject.toggled : false});
        } else {
            this.setState({toggled : this.state.toggled});
        }
    }

    onValChange = async () => {
        const settingsObject = {
            toggled: !this.state.toggled
        }
        setWeekStart(settingsObject)
        this.setState({toggled: !this.state.toggled})
    }

    render() {
        return <View style={styles.container}>
            <ScrollView>
                <View style={styles.item}>
                    <Text style={styles.text}>{strings('settings_screen.week_from_monday')}</Text>
                    <View style={styles.toggle}>
                        <Switch
                            onTintColor={'blue'}
                            onValueChange={this.onValChange}
                            value={this.state.toggled}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.openLink()} style={styles.item}>
                    <Text style={styles.text}>{strings('settings_screen.rate_the_application')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        height: 63,
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomColor: 'black',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EDF2FA',
        paddingHorizontal: 10
    },
    languageTitle: {
        paddingHorizontal: 10,
        borderBottomColor: 'black',
        justifyContent: 'center',
        flex: 1,
    },
    languageContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    pick: {
        flex: 1,
    },
    toggle: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 17,
        color: 'black'
    }
});

export default Settings;