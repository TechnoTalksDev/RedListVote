import { selectRandomFromDB } from '$lib/process';
import { scheduleJob, RecurrenceRule } from 'node-schedule';


const dailyRule = new RecurrenceRule();
dailyRule.minute = 0;
dailyRule.hour = 0;
dailyRule.tz = 'America/Los_Angeles';


const dailyJob = scheduleJob(dailyRule, async function () {
  await scheduledReset();
});


/*
Set new species at midnight PST
*/
async function scheduledReset() {
  let date = new Date()
  await selectRandomFromDB()
  console.log(`Refreshing species running at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

}
