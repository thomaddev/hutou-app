import schedule from "node-schedule";
export const exmapleRunCron = () => {
  const job = schedule.scheduleJob("0 1 * * *", function (fireDate) {
    console.log("This job was supposed to run at " + fireDate + ", but actually ran at " + new Date());
  });

};
