import React from 'react';
import { StyleSheet, Platform, StatusBar, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BaconMethodScreen } from './BaconMethodScreen'
import { HomeScreen } from './HomeScreen'

const AppStack = StackNavigator(
    {
        BaconMethodScreen: {
            screen: BaconMethodScreen
        },
        Home: {
            screen: HomeScreen
        },
    },
    {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
    }
);

export default AppStack;
