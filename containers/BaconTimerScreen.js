import React from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Easing,
  Animated,
  Image,
} from 'react-native';
import { Notifications } from 'expo';
import { PushService } from '../api/PushService';

import { fetchBaconBits, timerStarted, timerStopped } from '../actions';
import TimerSelectors from '../selectors/timerSelectors'
import * as Colors from '../Colors';

var moment = require('moment');
require("moment-duration-format");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        alignItems: 'center'
    },
    timerText: {
        fontSize: 72,
        textAlign: 'center',
        margin: 10,
        marginBottom: 20,
        marginTop: 30,
    },
    button: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: 156,
        width: 156,
        borderRadius: 64,
    },
    pig: {
        height: 156,
        width: 156
    },
    controlContainer: {
        height: 96,
        width: 96,
        borderRadius: 48,
        marginTop: 40,
    },
    controlImage: {
        height: 96,
        width: 96,
        borderRadius: 48
    },
});

class BaconTimerScreen extends React.Component {
    static navigationOptions = {
        title: "Bakin' Bacon Timer",
        tabBarLabel: '🥓 Timer',
        headerStyle: {backgroundColor: Colors.primary },
        headerTitleStyle: { color: Colors.titleColor },
        headerLeft: null
    };

    componentWillMount() {
      PushService.Register();
      this._notificationSubscription = Notifications.addListener(() => this.props.navigation.navigate('Feedback'));
    }

    constructor(props) {
      super(props);
      this.props.dispatch(fetchBaconBits());
    }

    startTimer() {
      this.props.dispatch(timerStarted());
    }

    stopTimer() {
      this.props.dispatch(timerStopped());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.timerText}>{this.props.timeLeft.format("m:ss", {trim: false})}</Text>
                <Image
                    style={{
                        height: 156,
                        width: 156,
                        transform: [{rotate: this.props.pigRotation}]
                    }}
                    source={require('../images/pig.png')}
                />
                <TouchableOpacity
                    style={ styles.controlContainer }
                    onPress={() => this.props.running ? this.stopTimer() : this.startTimer()}
                    >
                    <Image
                        style={styles.controlimage}
                        source={this.props.running
                            ? require('../images/bacon_reset.png')
                            : require('../images/bacon_play.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    // TODO: TRE - why do I have to say "state.timer" here?
    timeLeft: TimerSelectors.timeLeft(state.timer),
    isTimerExpired: TimerSelectors.isTimerExpired(state.timer),
    pigRotation: TimerSelectors.pigRotation(state.timer),
    running: state.timer.running,
    duration: state.timer.duration,
});

export default connect(mapStateToProps)(BaconTimerScreen)