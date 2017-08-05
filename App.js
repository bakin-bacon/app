import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as Colors from './Colors';
import { BakinBaconApi } from './BakinBaconApi';
import { BaconTimerScreen } from './BaconTimerScreen'
import { BaconMethodScreen } from './BaconMethodScreen'
import { BaconLogScreen } from './BaconLogScreen'

const MainScreenNavigator = TabNavigator(
    {
        Timer: { screen: BaconTimerScreen },
        Method: { screen: BaconMethodScreen },
        Log: { screen: BaconLogScreen },
    },
    {
        initialRouteName: 'Timer',
        headerMode: 'screen'
    }
)

const App = StackNavigator(
    {
        Home: { screen: MainScreenNavigator },
    },
    {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        },
    }
);

export default App;
