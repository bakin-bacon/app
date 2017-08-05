import React from 'react';
import { StyleSheet, Platform, StatusBar, Text, View, Component, Button, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Colors from './Colors';
import { BakinBaconApi } from './BakinBaconApi';
import { BaconMethodScreen } from './BaconMethodScreen'
import { BaconTimerScreen } from './BaconTimerScreen'
import { BaconProfileScreen } from './BaconProfileScreen'
import { BaconLogScreen } from './BaconLogScreen'
import { BaconResponseScreen } from './BaconResponseScreen'

const MainScreenNavigator = TabNavigator(
    {
        BaconTimerScreen: { screen: BaconTimerScreen },
        BaconMethodScreen: { screen: BaconMethodScreen },
        BaconLogScreen: { screen: BaconLogScreen },
        BaconProfileScreen: { screen: BaconProfileScreen },
        BaconResponseScreen: { screen: BaconResponseScreen },
    },
    {
        initialRouteName: 'BaconTimerScreen',
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
