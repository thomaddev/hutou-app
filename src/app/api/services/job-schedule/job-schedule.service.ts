import Agenda from "agenda";
import dayjs from "dayjs";
import schedule from "node-schedule";
import { IRotateSavingGroup } from "../rotate-saving-group/rotate-saving-group.model";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Period } from "@/app/constants/enum";
import { convertTimeStringToHourMinute } from "@/app/utils/datetime";

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });
const TIME_ZONE = "Asia/Bangkok";
dayjs.extend(utc);
dayjs.extend(timezone);
export async function startJob(group: IRotateSavingGroup) {
  const now = dayjs();
  const fiveMinutesLater = now.add(1, "minute").toDate();

  // console.log(group);
  const groupId = group._id;
  const period = group.period;
  const jobAlertName = `job-alert-${groupId}-${period}`;

  if (group.period && group.bitTime?.time) {
    const timeSplit = convertTimeStringToHourMinute(group.bitTime.time.toString());

    // Set up job processing
    agenda.define<IRotateSavingGroup>(jobAlertName, async (job: any) => {
      console.log(`~RUN~ ${jobAlertName}`, job?.attrs?._id);
    });
    const hour = Number(timeSplit?.h ?? 0);
    const minites = Number(timeSplit?.m ?? 0);
    const scheduleTime = dayjs().tz(TIME_ZONE).set("hour", hour).set("minute", minites).set("second", 0).toDate();

    // await agenda.start();
    // await agenda.every(getInterval(group.period), jobAlertName, { group }, { timezone: TIME_ZONE, skipImmediate: true, startDate: scheduleTime });
    // await agenda.every("1 minute", jobAlertName, { group }, { timezone: TIME_ZONE, skipImmediate: true, startDate: dayjs().tz(TIME_ZONE).toDate() });
  }

  // await agenda.schedule("1 minute", jobAlertName, {
  //   group,
  // });
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

function getInterval(period: Period): string {
  switch (period) {
    case Period.Day:
      return "24 hours";
    case Period.Week:
      return "1 week";
    case Period.Month:
      return "1 month";
  }
}

export async function getJobs() {
  await clearAllJob();
  return;

  try {
    const jobAlertName = `job-alert-65e08a31ef8d3a7ca072573c-day`;
    const jobs = await agenda.jobs();
    // const t = calculateJobRunTime(jobs);
    // console.log("time run : ", t);
    return jobs;
  } catch (error) {
    console.log(error);
  }

  // const jobAlertName = `job-alert-65e08a31ef8d3a7ca072573c-day`;
  // const jobs = await agenda.jobs();
  // console.log(jobs);
  // return jobs;
}

export async function clearAllJob() {
  await agenda.purge();
}
