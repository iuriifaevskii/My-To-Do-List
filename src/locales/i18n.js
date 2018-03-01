import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import moment from 'moment';

// Import all locales
import en from './en.json';
import uk from './uk.json';
import ru from './ru.json';

I18n.fallbacks = true;

I18n.translations = {
    en,
    uk,
    ru
};

const currentLocale = I18n.currentLocale();

export const isRTL = currentLocale.indexOf('uk') === 0 || currentLocale.indexOf('ar') === 0 || currentLocale.indexOf('ru') === 0;

ReactNative.I18nManager.allowRTL(isRTL);

// Localizing momentjs to Hebrew or English
if (currentLocale.indexOf('uk') === 0) {
    require('moment/locale/uk.js');
    moment.locale('uk');
} else if (currentLocale.indexOf('ru') === 0) {
    require('moment/locale/ru.js');
    moment.locale('ru');
} else if (currentLocale.indexOf('ar') === 0) {
    require('moment/locale/ar.js');
    moment.locale('ar');
} else {
    moment.locale('en');
}

export function strings(name, params = {}) {
    return I18n.t(name, params);
};

export default I18n;
