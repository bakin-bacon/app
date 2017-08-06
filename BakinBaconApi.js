import React, { AsyncStorage, Alert } from 'react-native';
import { PushService } from './push/PushService';

var SERVER_URL = 'https://api.bakinbacon.net';
var BACON_URL = SERVER_URL + '/v1/bacon-bits';
var API_KEY = 'jaRgGN99BY6n1oMSBopLY2M4TlKLG23K172BPKDG';
var USER_ID_STORAGE_KEY = 'user_id';

export class BakinBaconApi
{
    constructor() {
      console.ignoredYellowBox = ['[SECURITY] node-uuid:'];
    }

    async getUserId(){
      if(!this.userId){
        this.userId = await AsyncStorage.getItem(USER_ID_STORAGE_KEY);

        if((null === this.userId) || ("" === this.userId)) {
          this.userId = require('react-native-uuid').v4();
          AsyncStorage.setItem(USER_ID_STORAGE_KEY, this.userId);
          console.log('New userId is', this.userId);
        }
      }
    }

    async postBaconBit(baconBit, onBaconing) {
      await this.getUserId();

        try {
            fetch(BACON_URL, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
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
              console.log('POST response', responseData);
                if(responseData['🥓']){
                    onBaconing();
                }
            })
            .done();

        } catch (err) {
            console.log(err);
        }
    }

    async postBaconMade(onBaconPosted){
      var notificationToken = await PushService.Token();
      if(notificationToken == null){
        console.log('Notification token was null, so we cannot ask for a bacon feedback notification.');
        //TODO: Go ahead and navigate to feedback screen?
        return;
      }

      try {
          fetch(SERVER_URL + '/bacon-imminent', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
              },
              body: JSON.stringify({
                  device_token: notificationToken,
              })
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log('POST bacon made response', responseData);
              if(responseData['🥓']){
                  onBaconPosted();
              }
          })
          .done();

      } catch (err) {
          console.log(err);
      }
    }

    async getBaconBits(onBaconGot) {
      await this.getUserId();

        try {
            fetch(BACON_URL + '?user_id=' + this.userId, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'x-api-key': API_KEY
                }
            })
            .then((response) => response.json())
            .then((responseData) => {
              console.log('GET response:', responseData);
              onBaconGot(responseData);
            })
            .done();

        } catch (err) {
            console.log(err);
        }
    }
}
