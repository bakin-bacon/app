import { ActionType } from './actionTypes';
import TimerSelectors from '../selectors/timerSelectors'

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

function timerExpired() {
  clearInterval(this._interval);
  return {
    type: ActionType.TIMER_EXPIRED,
  }
}

function timerStarted() {
  return (dispatch, getState) => {
    this._interval = setInterval(() => {
      const state = getState().timer;
      if (state && TimerSelectors.isTimerExpired(state)) {
        dispatch(timerExpired());
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