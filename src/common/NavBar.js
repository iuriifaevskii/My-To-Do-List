import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    ScrollView,
    Image
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import {
    colors as colorConst,
    routes as routeConst
} from '../constants';

class NavBar extends Component {
    render() {
        return (
            <View>
                <StatusBar hidden={false} translucent backgroundColor="transparent" barStyle="light-content"/>
                <View style={styles.customNavBar}>
                    <View style={styles.customNavBarContainer}>
                        {this.props.leftIcon
                        ?
                        <TouchableOpacity onPress={this.props.onLeft} style={styles.customNavBarLeft}>
                            <Image style={styles.icon} source={require('./img/close.png')}/>
                        </TouchableOpacity>
                        :
                        <View style={styles.customNavBarLeft} />
                        }
                        <View style={styles.customNavBarCenter}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                        {this.props.rightIcon
                        ?
                        <TouchableOpacity onPress={() => {Actions[routeConst.SETTINGS]()}} style={styles.customNavBarRight}>
                            <Image style={styles.icon} source={require('./img/settings.png')}/>
                        </TouchableOpacity>
                        :
                        <View style={styles.customNavBarRight} />
                        }
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    customNavBar: {
        height: 72,
        backgroundColor: '#289fda'
    },
    customNavBarContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    customNavBarLeft: {
        flex: 20,
        paddingTop: (Platform.OS === 'ios') ? 34 : 20,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    customNavBarCenter: {
        flex: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customNavBarRight: {
        flex: 20,
        paddingTop: (Platform.OS === 'ios') ? 34 : 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        lineHeight: (Platform.OS === 'ios') ? 104 : 50,
        backgroundColor: 'transparent',
    },
    icon: {
        width: 40,
        height: 40,
    }
});

export default NavBar;