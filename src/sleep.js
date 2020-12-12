const helper = require('./helper');

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getUsersSleepData(id) {
    return helper.getUserData(this.sleepData, id);
  }

  calculateDailyAvgHoursSlept(id) {
    return (this.getUsersSleepData(id).reduce((acc, user) => {
      return acc += user.hoursSlept;
    }, 0) / this.getUsersSleepData(id).length).toFixed(1)
  }
}

if (typeof module !== "undefined") {
  module.exports = Sleep;
}