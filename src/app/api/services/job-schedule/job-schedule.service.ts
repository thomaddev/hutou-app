import Agenda from "agenda";
import dayjs from "dayjs";
import schedule from "node-schedule";

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

export async function startJob() {
  const now = dayjs();
  const fiveMinutesLater = now.add(1, "minute").toDate();

  agenda.define("delete old users", async () => {
    console.log("RUNNNNN");
  });

  (async function () {
    // IIFE to give access to async/await
    await agenda.start();
    await agenda.schedule("1 minute", "send email report", {
      to: "admin@example.com",
    });
    // await agenda.every("3 minutes", "delete old users");
  })();

  //   await agenda.define("testJob1", async (job: any) => {
  //     const contactDetails = job.attrs.data.contactDetails; // type Contact
  //   });

  //   await agenda.now("testJob1", {
  //     contactDetails: {
  //       test: "134",
  //     }, // required attr
  //   });

  //   await agenda.schedule("in 1 minutes", "testJob1", {
  //     contactDetails: {
  //       test: "134",
  //     }, // required attr
  //   });
  //   const job = schedule.scheduleJob("testJob1", fiveMinutesLater, function (fireDate) {
  //
  //   });
}

export function getJobs() {
  console.log(schedule.scheduledJobs);
  return schedule.scheduledJobs;
}
