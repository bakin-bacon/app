import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => this.props.navigation.navigate('Profile')}
      />
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  };

  render() {
    return (
      <Text>🥓!</Text>
    );
  }
}

const AppStack = StackNavigator({
  Home: { 
    screen: HomeScreen
  },
  Profile: { 
    screen: ProfileScreen
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppStack;
