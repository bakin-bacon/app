import React from 'react';
import { Provider, connect } from 'react-redux';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import * as Colors from './Colors';
import { combineReducers } from 'redux';
import getStore from './store';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { BaconTimerScreen } from './containers';
import { BaconMethodScreen } from './BaconMethodScreen';
import { BaconLogScreen } from './BaconLogScreen';
import { BaconFeedbackScreen } from './BaconFeedbackScreen';

const BaconTimerTab = StackNavigator({
    Home: {
      screen: BaconTimerScreen,
      path: '/',
    },
  });
  
const BaconLogTab = StackNavigator({
    BaconLog: {
        screen: BaconLogScreen,
        path: '/',
    },
    BaconFeedback: {
        screen: BaconFeedbackScreen,
    },
});

const BaconMethodTab = StackNavigator({
    BaconMethod: {
        screen: BaconMethodScreen,
    },
});

const TabOptions = {
    activeTintColor: Colors.titleColor,
    inactiveTintColor: Colors.primaryDark,
    labelStyle: {
        fontSize: 14,
    },
    style: {
        backgroundColor: Colors.secondary,
    }
};

const StacksInTabs = TabNavigator(
    {
        BaconTimerTab: {
            screen: BaconTimerTab,
            path: '/',
            navigationOptions: {
                title: "Bakin' Bacon Timer",
                tabBarLabel: 'Timer',
                headerStyle: { backgroundColor: Colors.primary },
                headerTitleStyle: { color: Colors.titleColor },
                headerLeft: null,
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-alarm' : 'ios-alarm-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
        BaconLogTab: {
            screen: BaconLogTab,
            path: '/bacon-log',
            navigationOptions: {
                tabBarLabel: 'Bacon Log',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-list' : 'ios-list-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
        BaconMethodTab: {
            screen: BaconMethodTab,
            path: '/bacon-method',
            navigationOptions: {
                tabBarLabel: 'Bacon Method',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
    },
    {
        tabBarOptions: TabOptions,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);

const AppNavigator = StacksInTabs;
const initialAction = AppNavigator.router.getActionForPathAndParams('/')
const initialState = AppNavigator.router.getStateForAction(initialAction);
const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    return nextState || state;
};

const appReducer = combineReducers({
    nav: navReducer,
    timer: require('./reducers/timerReducers')
})

class App extends React.Component {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        )
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={getStore(navReducer)}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}