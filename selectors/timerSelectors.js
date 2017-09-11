var moment = require('moment');
require("moment-duration-format");

const timeLeft = (state) => {
  if (state.running) {
    let timeLeft = moment
      .duration(state.duration)
      .subtract(moment().diff(state.startTime));

    return timeLeft.asMilliseconds <= 0
      ? moment.duration(0)
      : timeLeft;
  }
  return moment.duration(state.duration);
}

const isTimerExpired = (state) => {
  return state.running && timeLeft(state).asMilliseconds() <= 0;
}

const pigRotation = (state) => {
  var difference = moment.duration(state.duration).subtract(timeLeft(state));
  var rotation = 180 * difference / state.duration;

  return rotation + "deg";
}

module.exports = {timeLeft, isTimerExpired, pigRotation};