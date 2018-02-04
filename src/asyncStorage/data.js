import _ from 'lodash';

import days from '../jsons/days';

const getDays = () => {
    return days;
};

const getDayByDate = (date) => {
    return !_.isEmpty(days)
        ?
        days.map(day => {
            if (day.date === date) {
                return day;
            }
        })[0]
        :
        null;
};

export {
    getDays,
    getDayByDate
}