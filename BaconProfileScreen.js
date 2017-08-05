import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as Colors from './Colors';

export class BaconProfileScreen extends Component {
    static navigationOptions = {
      title: "Piggy Profile",
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', color: Colors.primary }}>Piggy Profile</Text>
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
