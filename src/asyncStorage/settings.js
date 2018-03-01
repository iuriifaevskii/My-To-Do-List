import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const setWeekStart = async (weekStart) => {
    try {
        await AsyncStorage.setItem('@MySuperWeekStart:key', JSON.stringify(weekStart));
    } catch (error) {
        throw new Error();
    }
}

const getWeekStart = async () => {
    try {
        const weekStart = await AsyncStorage.getItem('@MySuperWeekStart:key');
        if (weekStart !== null){
            return JSON.parse(weekStart);
        } else {
            return null;
        }
    } catch (error) {
        throw new Error();
    }
};

export {
    setWeekStart,
    getWeekStart,
}
