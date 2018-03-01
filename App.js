/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Scene,
  Actions,
  ActionConst,
  Modal,
  Tabs,
  Stack,
  Router
} from 'react-native-router-flux';

import {
    routes as routeConst
} from './src/constants';
import {strings} from './src/locales/i18n';
import {
    NavBar
} from './src/common';

import {
  Week,
  EnterPassword,
  Settings
} from './src/Scenes';

const App = () => (
    <Router>
        <Stack key="root">
            {<Scene
                navBar={NavBar}
                key={routeConst.ENTER_PASSWORD}
                component={EnterPassword}
                hideNavBar={false}
                leftIcon={false}
                rightIcon={false}
                onLeft={() => Actions.pop()}
                title={null}/>}
            <Scene 
                navBar={NavBar}
                key={routeConst.WEEK}
                component={Week}
                leftIcon={false}
                rightIcon={true}
                hideNavBar={false}
                onLeft={() => Actions.pop()}
                title={strings('week_screen.week')} />
            <Scene 
                navBar={NavBar}
                key={routeConst.SETTINGS}
                component={Settings} 
                leftIcon={true}
                rightIcon={false}
                hideNavBar={false}
                onLeft={() => Actions.reset(routeConst.WEEK)}
                title={strings('settings_screen.settings')}/>
        </Stack>
    </Router>
);

export default App;