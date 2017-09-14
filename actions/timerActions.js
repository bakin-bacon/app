import { Alert, Vibration } from 'react-native'
import { ActionType } from './actionTypes';
import TimerSelectors from '../selectors/timerSelectors'
import { BakinBaconApi } from '../api/BakinBaconApi'

const _api = new BakinBaconApi();

function fetchSucceeded(bacon_bits) {
  return {
    type: ActionType.FETCH_SUCCEEDED,
    payload: bacon_bits
  }
}


function fetchBaconBits() {
  return (dispatch) => {
    dispatch(fetchSucceeded([]))
    // use the api to go get the data, and then dispatch succeded with data, or failed
    // new BakinBaconApi().getBaconBits(bacon_bits => {
    //   dispatch(fetchSucceeded(bacon_bits))
    //   //this.setState({duration: baconOptimizer.optimize(bacon_bits)})
    // })
    // return api
    //   .logIn(username, password)
    //   .then(user => dispatch(loggedIn(user)))
    //   .catch(_ => dispatch(loginFailed('Invalid login credentials')));
  };
}

function timerExpired(duration, startTime) {
  clearInterval(this._interval);
  // TODO: sort out the fact that this is sending a null BSI, then later we're posting
  //       the BSI to a different (new) bacon bit.
  const baconBit = {
    timestamp: startTime.toISOString(),
    duration,
    bsi: null,
  }

  // TODO: turn this into a promise style API call
  _api.postBaconBit(baconBit, () => console.log('Feedback post succeeded'));

  alertUser();

  return {
    type: ActionType.TIMER_EXPIRED,
  }
}
function alertUser() {
  Vibration.vibrate([0, 200, 400, 600, 0, 100, 300, 500, 0, 200, 400, 500, 0, 100, 300, 500, 0, 200, 400, 600]);
  Alert.alert('Finished',
    'Go eat your perfect bacon.',
    [
      {
        text: 'OK', onPress: () => {
          Vibration.cancel();
        }
      }
    ],
    { cancelable: false }
  )
}

function timerStarted() {
  return (dispatch, getState) => {
    this._interval = setInterval(() => {
      const state = getState().timer;
      if (state && TimerSelectors.isTimerExpired(state)) {
        dispatch(timerExpired(state.duration, state.startTime));
      } else if (state && state.running) {
        dispatch(timerTicked());
      } else {
        dispatch({
          type: ActionType.TIMER_STARTED,
        });
      }
    }, 1000);
  };
}

export function timerTicked(dispatch, state) {
  return {
    type: ActionType.TIMER_TICKED,
  }
}
export function timerRestarted() {
  return {
    type: ActionType.TIMER_RESTARTED,

  }
}

module.exports = {fetchBaconBits, timerStarted, timerTicked}