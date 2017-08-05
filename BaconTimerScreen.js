import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as Colors from './Colors';

export class BaconTimerScreen extends Component {
    static navigationOptions = {
        title: "Bakin' Bacon Timer",
        tabBarLabel: 'Timer',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', color: Colors.primary }}>Bakin Bacon Timer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
