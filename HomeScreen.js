import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as Colors from './Colors';

export class HomeScreen extends Component {
    static navigationOptions = {
      title: "Bakin' Bacon",
      drawerLabel: "Bakin' Bacon",
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', color: Colors.primary }}>Home  Bacon Screen</Text>
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
