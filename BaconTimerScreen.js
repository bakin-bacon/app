import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Easing,
  Animated,
  Image
} from 'react-native';
import * as Colors from './Colors';

export class BaconTimerScreen extends Component {
    static navigationOptions = {
        title: "Bakin' Bacon Timer",
        tabBarLabel: 'Timer',
    };
    constructor(props) {
      super(props);
      this.state = {
        duration: 1200,
        timer: null,
        running: false
      };
    }

    render() {
        const onPressControl = this.onPressControl.bind(this);
        return (
            <View style={styles.container}>
                <Text style={styles.timerText}>{this.timeLeft()}</Text>
                <Image
                    style={ styles.image }
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

    setTimer() {
        if( this.state.running) {
            this._interval = setInterval(() => {
                if(this.state.duration > 0 ) {
                    this.setState({duration: this.state.duration - 1});
                }
                else
                {
                    // NOTIFY USER DONE.

                }
            }, 1000);
        } else {
            clearInterval(this._interval);
            this.setState({duration: 1200});
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
        var minutes = Math.floor(this.state.duration / 60);
        var seconds = this.state.duration % 60;
        return (minutes == 0 ? "0" : minutes) + ":" + (seconds == 0 ? "00" : (seconds < 10) ? "0" + seconds : seconds);
    }

    controlImage() {
        if (this.state.running) {
            return (
                    <Image
                        style={ styles.controlImage }
                        source={require('./images/reset.png')}
                    />
                )
        }
        return (
            <Image
                    style={ styles.controlImage }
                    source={require('./images/play.png')}
                />
            )
    }
}

// // First set up animation
// Animated.timing(
//     this.state.spinValue,
//   {
//     toValue: 1,
//     duration: 1200,
//     easing: Easing.linear
//   }
// ).start()
//
// // Second interpolate beginning and end values (in this case 0 and 1)
// const spin = this.state.spinValue.interpolate({
//   inputRange: [0, 1],
//   outputRange: ['0deg', '180deg']
// })

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
  image: {
    height:156,
    width: 156,
    borderRadius: 64
  },
  controlContainer: {
    height:96,
    width: 96,
    borderRadius: 32,
    marginTop: 40,
  },
  controlImage: {
    height:96,
    width: 96,
    borderRadius: 32
  },
});
