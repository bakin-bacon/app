import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, Image, Button, Alert } from 'react-native';
import * as Colors from './Colors';
import { BakinBaconApi } from './BakinBaconApi';

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  textContainer: {
    flex: 1,
    margin: 12
  },
  header1: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  header2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5
  },
  paragraph: {
    fontSize: 15,
    marginTop: 5
  },
  stepText: {
    fontSize: 15,
    marginLeft: 12,
    marginRight: 12
  },
  tipsTitle: {
    fontWeight: 'bold'
  },
  bacon: {
    fontSize: 32,
    backgroundColor: 'transparent',
  }
});

export class BaconMethodScreen extends React.Component {
    static navigationOptions = {
        title: 'The Bacon Method',
        tabBarLabel: 'Method',
        tabBarIcon: ({ tintColor }) => (
              <Image
                source={require('./images/icon-alarm.png')}
                style={[styles.icon, {tintColor: tintColor}]}
              />
            ),
        headerStyle: {backgroundColor: Colors.primary },
        headerTitleStyle: { color: Colors.titleColor }
    };

    render() {
      const title = "Make Perfect Bacon Every Time";
      const subtitle = "By Dan Benjamin ";
      const subtitleTwitterText = "(tweet @danbenjamin)\n";
      const easyText = "It's easy. Here's how:\n";
      const step1 = "1. Line a pan with the bacon. You can use a glass baking pan, a steel or aluminum baking sheet, or even a cast iron pan. Check out the list of tools we like.";
      const step2 = "2. Put the pan into a cold, unheated oven. I use the middle rack.";
      const step3 = "3. Set the oven to bake at 400°F (204°C).";
      const step4 = "4. Set the timer for 20 minutes. It may take a bit more or less time, depending on your oven. You can calibrate your oven for even better results.";
      const step5 = "5. Remove the pan from the oven. Place the bacon on a plate (or a plate lined with a paper towel if you’re grease averse).";
      const step6 = "6. Enjoy the best, most delicious bacon you’ve ever had.\n";
      const tipsTitle = "Tips: ";
      const tipsText = "You don’t need to cover the pan, it won’t mess up your oven. Line the pan with aluminum foil or Silpat for easier cleanup. Don’t use a baking rack to \"keep the bacon out of the grease.\" Instead, put the bacon onto a paper towel-lined plate when it's done."

      //var api = new BakinBaconApi();
      //api.postBaconBit({duration: 1200, timestamp: new Date().toISOString(), bsi: -1}, () => api.getBaconBits(this.onBaconGot));

      return (
        <ScrollView style={styles.masterContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header1}>{title}</Text>
            <Text>
              <Text style={styles.header2}>{subtitle}</Text>
              <Text style={styles.paragraph}>{subtitleTwitterText}</Text>
            </Text>
            <Text style={styles.paragraph}>{easyText}</Text>

            <Text style={styles.stepText}>{step1}</Text>
            <Text style={styles.stepText}>{step2}</Text>
            <Text style={styles.stepText}>{step3}</Text>
            <Text style={styles.stepText}>{step4}</Text>
            <Text style={styles.stepText}>{step5}</Text>
            <Text style={styles.stepText}>{step6}</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.tipsTitle}>{tipsTitle}</Text>
              <Text>{tipsText}</Text>
            </Text>
          </View>
        </ScrollView>
      );
  }
}
