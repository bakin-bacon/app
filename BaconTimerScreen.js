import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Easing,
  Animated,
  Image,
  Vibration,
  Alert
} from 'react-native';
import * as Colors from './Colors';
import { BakinBaconApi } from './BakinBaconApi';
import { BaconOptimizer, StaticOptimizer } from './BaconOptimizer';
import { PushService } from './push/PushService';
import { Notifications } from 'expo';

var moment = require('moment');
require("moment-duration-format");

export class BaconTimerScreen extends Component {
    static navigationOptions = {
        title: "Bakin' Bacon Timer",
        tabBarLabel: 'Timer',
        headerStyle: {backgroundColor: Colors.primary },
        headerTitleStyle: { color: Colors.titleColor },
        headerLeft: null
    };

    componentWillMount() {
      PushService.Register();

      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(() => this.props.navigation.navigate('Feedback'));
    }

    constructor(props) {
      super(props);
      //this.baconOptimizer = new StaticOptimizer(moment.duration(20, "seconds"));
      this.baconOptimizer = new BaconOptimizer();
      this.state = {
          duration: this.baconOptimizer.optimize([], null),
          startTime: null,
          running: false
      };
      this.api = new BakinBaconApi();
      this.api.getBaconBits(this.handleBaconBits.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.timerText}>{this.timeLeft().format("m:ss", {trim: false})}</Text>
                <Image
                    style={ this.getPigImageRotationStyle() }
                    source={require('./images/pig.png')}
                />
                <TouchableOpacity
                    style={ styles.controlContainer }
                    onPress={this.toggleRunning.bind(this)}
                    >
                    {this.controlImage()}
                </TouchableOpacity>
            </View>
        );
    }

    handleBaconBits(bacon_bits) {
      this.setState({duration: this.baconOptimizer.optimize(bacon_bits)});
    }

    getPigImageRotationStyle(){
        return {
            height:156,
            width: 156,
            transform: [{rotate: this.degreeRotation()}]
        };
     }

    alertUser() {
        Vibration.vibrate([0, 200, 400, 600, 0, 100, 300, 500, 0, 200, 400, 500, 0, 100, 300, 500, 0, 200, 400, 600]);
        Alert.alert('Finished',
            'Go eat your perfect bacon.',
            [
                {text: 'OK', onPress: () => {
                    Vibration.cancel();
                }}
            ],
            { cancelable: false }
        )
    }

    startTimer() {
        this._interval = setInterval(() => {
            if (this.isTimerExpired()) {
                this.stopTimer();
                this.alertUser();
            }
            // this gets the ball rolling, or keeps it rolling
            this.setState({
                running: true,
                startTime: this.state.startTime || moment()
            });
        }, 1000);
    }

    stopTimer() {
        clearInterval(this._interval);
        this.setState({
            running: false,
            startTime: null,
        });
    }
    toggleRunning() {
        if (this.state.running) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    timeLeft() {
        if (this.state.running) {
            let timeLeft = moment
                .duration(this.state.duration)
                .subtract(moment().diff(this.state.startTime));
            
            return timeLeft.asMilliseconds <= 0
                ? moment.duration(0)
                : timeLeft;
        }
        return moment.duration(this.state.duration);
    }

    isTimerExpired() {
        return this.timeLeft().asMilliseconds() <= 0;
    }

    degreeRotation() {
        var difference = moment.duration(this.state.duration).subtract(this.timeLeft());
        var rotation = 180 * difference / this.state.duration;

        return rotation + "deg";
    }

    controlImage() {
        return (
            <Image
                style={styles.controlimage}
                source={this.state.running
                    ? require('./images/bacon_reset.png')
                    : require('./images/bacon_play.png')}
            />
        );
    }
}

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
    height:156,
    width: 156,
    borderRadius: 64,
  },
  pig: {
    height:156,
    width: 156
  },
  controlContainer: {
    height:96,
    width: 96,
    borderRadius: 48,
    marginTop: 40,
  },
  controlImage: {
    height:96,
    width: 96,
    borderRadius: 48
  },
});
