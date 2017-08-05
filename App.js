import React from 'react';
import { StyleSheet, Platform, StatusBar, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BaconMethodScreen } from './BaconMethodScreen'

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: "Bakin' Bacon",
      headerLeft: <Button onPress={() => props.navigation.navigate('DrawerOpen')} title= "🥓" />
    };

  render() {
    return (
      <Button
        title="?"
        onPress={() => this.props.navigation.navigate('BaconMethodScreen')}
      />
    );
  }
}

const AppStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        BaconMethodScreen: {
            screen: BaconMethodScreen
        },
    },
    {
        cardStyle: {
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
      }
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppStack;
