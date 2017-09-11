import React from 'react';
import { Provider, connect } from 'react-redux';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import * as Colors from './Colors';
import { combineReducers } from 'redux';
import getStore from './store';

import { BaconTimerScreen } from './containers';
import { BaconMethodScreen } from './BaconMethodScreen';
import { BaconLogScreen } from './BaconLogScreen';
import { BaconFeedbackScreen } from './BaconFeedbackScreen';

const MainScreenNavigator = TabNavigator(
    {
        Timer: { screen: BaconTimerScreen },
        // Log: { screen: BaconLogScreen },
        // Method: { screen: BaconMethodScreen },
        // Feedback: { screen: BaconFeedbackScreen }
    },
    {
        initialRouteName: 'Timer',
        headerMode: 'screen',
        tabBarOptions: {
            style: {
                backgroundColor: Colors.secondary
            }
        },
        cardStyle: { paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight },
    }
)

const AppNavigator = MainScreenNavigator;

const initialAction = AppNavigator.router.getActionForPathAndParams('Timer')
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