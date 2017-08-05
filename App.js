import React from 'react';
import { StyleSheet, Platform, StatusBar, Text, View, Component, Button } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import * as Colors from './Colors';
import { BaconMethodScreen } from './BaconMethodScreen';
import { HomeScreen } from './HomeScreen';
import { BakinBaconApi } from './BakinBaconApi';

const ApplianceStackNavigator = StackNavigator({
  BaconMethodScreen: { screen: BaconMethodScreen },
  HomeScreen: { screen: HomeScreen }
    },
    {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
    },
{
  initialRouteName: 'BaconMethodScreen',
  headerMode: 'screen'
})

const MainDrawerNavigator = DrawerNavigator({
  ApplianceStackNavigator: { screen: ApplianceStackNavigator }
}, {
  initialRouteName: 'ApplianceStackNavigator',
  headerMode: 'screen'
})

export default MainDrawerNavigator;
