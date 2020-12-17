// summary page
const userName = document.querySelector('.greeting');
const summaryPage = document.querySelector('.summary-view-js');
const calendar = document.querySelector('#calendar');
const hydrationImg = document.querySelector('#hydration-image');
const summaryHydrationData = document.querySelector('.hydration-data-js');
const sleepImg = document.querySelector('#sleep-image');
const summarySleepData = document.querySelector('.sleep-data-js');
const stepGoalComparison = document.querySelector('.step-goal-comparison-js');

// hydration
const hydrationPage = document.querySelector('.hydration-detailed-view-js');
const hydrationImgDetailed = document.querySelector('#hydration-image-detailed');
const detailedHydrationData = document.querySelector('.detailed-hydration-data-js');
const weeklyHydrationData = document.querySelector('.weekly-intake-js');
const avgHydrationIntakeData = document.querySelector('.avg-intake-js');

// Sleep
const sleepPage = document.querySelector('.sleep-detailed-view-js');
const sleepImgDetailed = document.querySelector('#sleep-image-detailed');
const dayHoursSlept = document.querySelector('.day-hours-slept-js');
const daySleepQuality = document.querySelector('.day-sleep-quality-js');
const weeklyHoursSlept = document.querySelector('.weekly-hours-slept-js');
const allTimeHoursSlept = document.querySelector('.all-time-hours-slept-js');
const allTimeSleepQuality = document.querySelector('.all-time-sleep-quality-js');

// Activity
const activityPage = document.querySelector('.activity-detailed-view-js');
const activityImg = document.querySelector('#activity-image');
const activityImgDetailed = document.querySelector('#activity-image-detailed');
const dailySteps = document.querySelector('.daily-steps');
const goalReached = document.querySelector('.goal-reached');


const allUsers = new UserRepository(userData);
const user = new User(allUsers.getUser(12));
const hydrationStats = new Hydration(hydrationData);
const sleepStats = new Sleep(sleepData);
const activityStats = new Activity(activityData, userData);
const activityRepoStats = new ActivityRepository(activityData);
let date = '2019/06/15'

window.addEventListener('load', displaySummaryData);
calendar.addEventListener('change', resetData);
hydrationImg.addEventListener('click', displayHydrationPage);
hydrationImgDetailed.addEventListener('click', displayHydrationPage);
sleepImg.addEventListener('click', displaySleepPage);
sleepImgDetailed.addEventListener('click', displaySleepPage);
activityImg.addEventListener('click', displayActivityPage);
activityImgDetailed.addEventListener('click', displayActivityPage);

function displaySummaryData() {
  greetUser();
  getUserSummaryData();
}

function greetUser() {
  userName.innerText = `Welcome, ${user.returnFirstName()}!`;
}

function getDate() {
  const newDate = calendar.value;
  let dataDate = newDate.replace('-', '/');
  dataDate = dataDate.replace('-', '/');
  return date = dataDate;
}

function getUserSummaryData() {
  summaryHydrationData.innerText = `${hydrationStats.findDailyIntake(date, 12)}`;
  summarySleepData.innerText = `${sleepStats.findDailyHrsSlept(date, 12)}`;
  stepGoalComparison.innerText = ` Your step goal is: ${user.dailyStepGoal}. Across all users the average step goal is: ${allUsers.calculateAvgStepGoal()}.`;
}

function resetData() {
  getDate();
  getUserSummaryData();
  getHydrationPageData();
  getSleepPageData();
  getActivityPageData();
}

function displayHydrationPage() {
  togglePages(summaryPage, hydrationPage);
  getHydrationPageData();
}

function getHydrationPageData() {
  detailedHydrationData.innerText = `${hydrationStats.findDailyIntake(date, 12)}`;
  avgHydrationIntakeData.innerText = `${hydrationStats.calculateDailyAvgIntake(12)} oz`;
  const weeklyStats = hydrationStats.getWeeklyIntake(date, 12);
  const spacedWeeklyStats = weeklyStats.join(', ');
  getWeeklyData(weeklyHydrationData, spacedWeeklyStats);
}

function displaySleepPage() {
  togglePages(summaryPage, sleepPage);
  getSleepPageData();
}

function getSleepPageData() {
  dayHoursSlept.innerText = `${sleepStats.findDailyHrsSlept(date, 12)}`;
  daySleepQuality.innerText = `${sleepStats.findDailySleepQuality(date, 12)}`;
  allTimeHoursSlept.innerText = `${sleepStats.calculateDailyAvgHoursSlept(12)}`;
  allTimeSleepQuality.innerText = `${sleepStats.calculateDailyAvgSleepQuality(12)}`;
  const weeklyStats = sleepStats.calculateWeeklyHrsSlept(date, 12)
  const spacedWeeklyStats = weeklyStats.join(', ')
  getWeeklyData(weeklyHoursSlept, spacedWeeklyStats);
}

function getWeeklyData(selector, method) {
  selector.innerHTML = `
<span>${method}</span>
`;
}

function displayActivityPage() {
  togglePages(summaryPage, activityPage);
  getActivityPageData();
}

function getActivityPageData() {
  dailySteps.innerText = ` Your steps: ${activityStats.findDailySteps(date, 12)} 
  All users average steps: ${activityRepoStats.getAvgStepsForAllUsers(date)}`;

  goalReached.innerText = `${activityStats.giveFeedback(date, 12)}`;

  
}

function togglePages(pageOne, pageTwo) {
  pageOne.classList.toggle('hidden');
  pageTwo.classList.toggle('hidden');
}