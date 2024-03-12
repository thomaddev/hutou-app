import Agenda from "agenda";
import { defindJobTimeBit, defindJobTimeBitBefore, defineAllJob, startJob } from "../api/services/job-schedule/job-schedule.service";
const agenda = new Agenda({ db: { address: process.env.MONGODB_URI ?? "" } });

async function restoreJobsFromDatabase() {
  const jobs = await agenda.jobs();
  console.log("============== START TEST ==============");
  jobs.forEach(async (job) => {
    const { name, repeatInterval, data } = job.attrs;
    const groupId = data?.group?._id?.toString();
    const period = data?.group?.period;
    startJob(data.group);
    // Set up Job Time Bit
    // defindJobTimeBit(name, groupId, period);
    // // Set up Job Time Bit before 5 minite
    // defindJobTimeBitBefore(name, groupId, period);
  });
  console.log("============== START TEST ==============");

  // console.log("============== START Defined Job ==============");
  // jobs.forEach(async (job) => {
  //   const { name, repeatInterval, data } = job.attrs;
  //   console.log({
  //     groupId: data?.group?._id?.toString(),
  //     period: data?.group?.period,
  //   });
  //   const groupId = data?.group?._id?.toString();
  //   const period = data?.group?.period;
  //   // defineAllJob(name, groupId, period);
  //   // Set up Job Time Bit
  //   defindJobTimeBit(name, groupId, period);
  //   // Set up Job Time Bit before 5 minite
  //   defindJobTimeBitBefore(name, groupId, period);
  // });
  // console.log("============== END Defined Job ==============");
  // await agenda.start();
  // console.log("============== START run every Job ==============");
  // jobs.forEach(async (job) => {
  //   const { name, repeatInterval, data } = job.attrs;
  //   console.log({
  //     name,
  //     repeatInterval,
  //   });
  //   if (repeatInterval) {
  //     await agenda.every(repeatInterval, name, data);
  //   }
  // });
  // console.log("============== END run every Job ==============");
}

export async function startAgenda() {
  console.log("============== START Agenda ==============");
  await restoreJobsFromDatabase();
  console.log("============== END START Agenda ==============");
}
