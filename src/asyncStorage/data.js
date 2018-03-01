import {AsyncStorage} from 'react-native';
import _ from 'lodash';

import days from '../jsons/days';

const getDays = async () => {
    try {
        const days = await AsyncStorage.getItem('@MySuperStore:key');
        if (days !== null){
            //await AsyncStorage.clear();
            
            return JSON.parse(days);
        } else {
            return [];
        }
    } catch (error) {
        throw new Error();
    }
};

const setDays = async (newDays) => {
    try {
        await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(newDays));
    } catch (error) {
        throw new Error();
    }
}


export {
    getDays,
    setDays
}
