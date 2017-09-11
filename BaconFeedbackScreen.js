import React from 'react';
import { StyleSheet, Dimensions, StatusBar, Text, ScrollView, View, Image, Button, TouchableOpacity, Alert } from 'react-native';
import * as Colors from './Colors';
import { BakinBaconApi } from './api/BakinBaconApi';

export class BaconFeedbackScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'How was your bacon?',
      headerStyle: {backgroundColor: Colors.primary },
      headerTitleStyle: { color: Colors.titleColor },
      tabBarLabel: "Feedback",
      headerRight: <TouchableOpacity onPress={() => params.handleSubmit()}>
                       <Text style={styles.rightButton}>Submit</Text>
                   </TouchableOpacity>,
      headerLeft: null
    };
  };

  constructor(){
    super();
    this.api = new BakinBaconApi();
    this.state = {
      feedback: null
    };
  }

  submitFeedback() {
    const alertMessage = "We'll send you a smarter time for your next perfect bacon attempt.";

    if(this.bsi != null){
      Alert.alert(
        'Thanks!',
        alertMessage,
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Log')},
        ],
        { cancelable: false }
      );
      this.setState({feedback: null});
      this.api.postBaconBit({timestamp: new Date().toISOString(), bsi: this.bsi}, () => console.log('Feedback post succeeded'));
    }
  }

  componentDidMount() {
    const submitFeedback = this.submitFeedback.bind(this);
    this.props.navigation.setParams({ handleSubmit: submitFeedback });
  }

  async pressedTooCrispy(){
    this.bsi = -1;
    await this.setState({feedback: 'crispy'});
  }

  async pressedPerfect(){
    this.bsi = 0;
    await this.setState({feedback: 'perfect'});
  }

  async pressedTooFloppy(){
    this.bsi = 1;
    await this.setState({feedback: 'floppy'});
  }

  getBaconImageStyle(imageDiameter, borderColor){
    return {
      width: imageDiameter,
      height: imageDiameter,
      borderRadius: imageDiameter / 2,
      borderColor: borderColor,
      borderWidth: 3,
      marginTop: 35 };
    }

  render(){
    var imageDiameter = Dimensions.get('window').height / 6.5;

    const onPressedCrispy = this.pressedTooCrispy.bind(this);
    const onPressedPerfect = this.pressedPerfect.bind(this);
    const onPressedFloppy = this.pressedTooFloppy.bind(this);

    var crispyColor = this.state.feedback == 'crispy' ? Colors.primaryDark : 'white';
    var perfectColor = this.state.feedback == 'perfect' ? Colors.primaryDark : 'white';
    var undercookedColor = this.state.feedback == 'floppy' ? Colors.primaryDark : 'white';

    return(
      <ScrollView style={styles.masterContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressedCrispy}>
            <Image
              source={require('./images/Burnt-Bacon.png')}
              style={this.getBaconImageStyle(imageDiameter, crispyColor)}/>
          </TouchableOpacity>
          <Text style={styles.baconLabel}>Too Crispy</Text>

          <TouchableOpacity onPress={onPressedPerfect}>
            <Image
              source={require('./images/JustRight-Bacon.png')}
              style={this.getBaconImageStyle(imageDiameter, perfectColor)}/>
          </TouchableOpacity>
          <Text style={styles.baconLabel}>Just Right!</Text>

          <TouchableOpacity onPress={onPressedFloppy}>
            <Image
              source={require('./images/Undercooked-Bacon.png')}
              style={this.getBaconImageStyle(imageDiameter, undercookedColor)}/>
          </TouchableOpacity>
          <Text style={styles.baconLabel}>Too Floppy</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  container: {
    marginLeft: 12,
    marginBottom: 12,
    marginRight: 12,
    alignItems: 'center'
  },
  baconLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3
  },
  rightButton: {
    color: Colors.titleColor,
    backgroundColor: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16
  }
});
