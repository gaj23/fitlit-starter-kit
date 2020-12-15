class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
    //all user's data stored as an arry of objects
  }

  getTotalSleepQualityAvg() {
    return (this.sleepData.reduce((acc, data) => {
      return acc += data.sleepQuality;
    }, 0) / this.sleepData.length).toFixed(1);
  }

  getGoodQualitySleepUsers(date) {
    return this.sleepData.filter(user => date === user.date && user.sleepQuality > 3).map(user => {
      return user.userID;
    });
  }
}



if (typeof module !== "undefined") {
  module.exports = SleepRepo;
}