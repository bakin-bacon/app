import React from 'react';
import { StyleSheet, Dimensions, StatusBar, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import * as Colors from './Colors';
import { BakinBaconApi } from './BakinBaconApi';

export class BaconFeedbackScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'How was your bacon?',
      headerRight: <Button title='Submit' color={Colors.primaryDark} onPress={() => params.handleSubmit()} />
    };
  };

  constructor(){
    super();
    this.api = new BakinBaconApi();
    this.state = {
      feedback: null
    };
    //this.api.getBaconBits(() => {});
  }

  submitFeedback() {
    if(this.bsi != null){
      console.log(this.bsi, 'feedback submitted')
      this.api.postBaconBit({duration: 1200, timestamp: new Date().toISOString(), bsi: this.bsi}, () => {});
    }

    //TODO: Make modal and close window
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
      marginTop: 40 };
    }

  render(){
    var imageDiameter = Dimensions.get('window').height / 6;

    const onPressedCrispy = this.pressedTooCrispy.bind(this);
    const onPressedPerfect = this.pressedPerfect.bind(this);
    const onPressedFloppy = this.pressedTooFloppy.bind(this);

    var crispyColor = this.state.feedback == 'crispy' ? Colors.primaryDark : Colors.secondary;
    var perfectColor = this.state.feedback == 'perfect' ? Colors.primaryDark : Colors.secondary;
    var undercookedColor = this.state.feedback == 'floppy' ? Colors.primaryDark : Colors.secondary;

    return(
      <View style={styles.masterContainer}>
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
      </View>
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
  }
});