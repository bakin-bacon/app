'use strict';
import React, {
  AsyncStorage,
  AlertIOS
} from 'react-native';

var SERVER_URL = 'https://ziiwfyoc40.execute-api.us-east-2.amazonaws.com/prod
var BACON_URL = SERVER_URL + '/bacon-bit';

export class BakinBaconApi
{
    constructor() {
        
    }

    postBaconBit(baconBit, onBaconing) {
        try {
            fetch(BACON_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + session.toString('base64')
                },
                body: JSON.stringify({
                    user_id: poll.userId,
                    duration: poll.duration,
                    timestamp: poll.timestamp,
                    bsi: poll.bsi
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData == '🥓'){
                    onBaconing();
                }
            })
            .done();

        } catch (err) {
            AlertIOS.alert(
                "PUT Poll ERROR",
                "[" + err + "]"
            )
        }
    }
}