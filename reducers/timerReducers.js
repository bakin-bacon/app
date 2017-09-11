import { ActionType } from '../actions/actionTypes';
import { BaconOptimizer, StaticOptimizer } from '../BaconOptimizer';

var moment = require('moment');

var _optimizer = new StaticOptimizer(moment.duration(20, "seconds"));

const initialState = {
  running: false,
  startTime: null,
  duration: _optimizer.optimize([], null),
}

function timer(state = initialState, action) {
  switch(action.type) {
    case ActionType.TIMER_EXPIRED:
      return Object.assign({}, state, {
        running: false,
        startTime: null,
      });
    case ActionType.TIMER_STARTED:
    case ActionType.TIMER_TICKED:
      return Object.assign({}, state, {
        running: true,
        startTime: state.startTime || moment(),
      })
    case ActionType.FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        duration: _optimizer.optimize(action.payload)
      })
    default:
      return state;
  }
}

module.exports = timer;