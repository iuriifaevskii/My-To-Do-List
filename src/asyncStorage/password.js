import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const setPassword = async (newPass) => {
    try {
        await AsyncStorage.setItem('@MySuperPass:key', JSON.stringify(newPass));
    } catch (error) {
        throw new Error();
    }
}

const getPassword = async () => {
    try {
        const password = await AsyncStorage.getItem('@MySuperPass:key');
        if (password !== null){
            return JSON.parse(password);
        } else {
            return null;
        }
    } catch (error) {
        throw new Error();
    }
};

const setSecret = async (secret) => {
    try {
        await AsyncStorage.setItem('@MySuperSecret:key', JSON.stringify(secret));
    } catch (error) {
        throw new Error();
    }
}

const getSecret = async () => {
    try {
        const secret = await AsyncStorage.getItem('@MySuperSecret:key');
        if (secret !== null){
            return JSON.parse(secret);
        } else {
            return null;
        }
    } catch (error) {
        throw new Error();
    }
};

const removePassword = async () => {
    try {
        await AsyncStorage.removeItem('@MySuperPass:key')
    } catch (error) {
        throw new Error();
    }
}

export {
    setPassword,
    getPassword,
    setSecret,
    getSecret,
    removePassword
}
