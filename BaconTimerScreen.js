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
import { PushService } from './push/PushService';

const defaultDuration = 10;

var StateVars = { duration: defaultDuration };

export class BaconTimerScreen extends Component {
    static navigationOptions = {
        title: "Bakin' Bacon Timer",
        tabBarLabel: 'Timer',
        headerStyle: {backgroundColor: Colors.primary },
        headerTitleStyle: { color: Colors.titleColor }
    };
    constructor(props) {
      super(props);
      this.state = {
        timeleft: StateVars.duration,
        timer: null,
        running: false
      };
      this.spinValue = new Animated.Value(0);
      this.api = new BakinBaconApi();
      PushService.Register();
    }

    render() {
        const onPressControl = this.onPressControl.bind(this);
        return (
            <View style={styles.container}>
                <Text style={styles.timerText}>{this.timeLeft()}</Text>
                <Image
                    style={ styles.pig }
                    source={require('./images/pig.png')}
                />
                <TouchableOpacity
                    style={ styles.controlContainer }
                    onPress={onPressControl}
                    >
                    {this.controlImage()}
                </TouchableOpacity>
            </View>
        );
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

    setTimer() {
        if( this.state.running) {
            this._interval = setInterval(() => {
                if(this.state.timeleft > 0 ) {
                    this.setState({timeleft: this.state.timeleft - 1});
                }
                else
                {
                    clearInterval(this._interval);
                    this.alertUser();
                    this.api.postBaconMade(() => {console.log('we made bacon!')});
                }
            }, 1000);
        } else {
            clearInterval(this._interval);
            this.setState({timeleft: StateVars.duration});
        }
    }

    async toggleRunning() {
        await this.setState({running: !this.state.running});
        this.setTimer();
    }

    onPressControl() {
        this.toggleRunning();
    }

    timeLeft() {
        var minutes = Math.floor(this.state.timeleft / 60);
        var seconds = this.state.timeleft % 60;
        return (minutes == 0 ? "0" : minutes) + ":" + (seconds == 0 ? "00" : (seconds < 10) ? "0" + seconds : seconds);
    }

    controlImage() {
        if (this.state.running) {
            return (
                    <Image
                        style={ styles.controlImage }
                        source={require('./images/bacon_reset.png')}
                    />
                )
        }
        return (
            <Image
                    style={ styles.controlImage }
                    source={require('./images/bacon_play.png')}
                />
            )
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

exports.StateVars = StateVars;
