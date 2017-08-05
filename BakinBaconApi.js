import React, { AsyncStorage, Alert } from 'react-native';

var SERVER_URL = 'https://ziiwfyoc40.execute-api.us-east-2.amazonaws.com/prod';
var BACON_URL = SERVER_URL + '/bacon-bit';
var API_KEY = 'jaRgGN99BY6n1oMSBopLY2M4TlKLG23K172BPKDG';
var USER_ID_STORAGE_KEY = 'user_id';

export class BakinBaconApi
{
    constructor() {
      console.ignoredYellowBox = ['[SECURITY] node-uuid:'];
      this.checkUserId();
    }

    async checkUserId(){
      this.userId = await AsyncStorage.getItem(USER_ID_STORAGE_KEY);
      if((null === this.userId) || ("" === this.userId)) {
          this.generateUserId();
      }
    }

    async generateUserId(){
      this.userId = require('react-native-uuid').v4();
      await AsyncStorage.setItem(USER_ID_STORAGE_KEY, this.userId);
    }

    postBaconBit(baconBit, onBaconing) {
        try {
            fetch(BACON_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + session.toString('base64'),
                  'x-api-key': API_KEY
                },
                body: JSON.stringify({
                    user_id: this.userId,
                    duration: baconBit.duration,
                    timestamp: baconBit.timestamp,
                    bsi: baconBit.bsi
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData['🥓']){
                    onBaconing();
                }
            })
            .done();

        } catch (err) {

        }
    }
}
