import Agenda from "agenda";
import dayjs from "dayjs";
import schedule from "node-schedule";
import { IRotateSavingGroup, RotateSavingGroupDocument } from "../rotate-saving-group/rotate-saving-group.model";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Period } from "@/app/constants/enum";
import { convertTimeStringToHourMinute } from "@/app/utils/datetime";
import { pushMessageToGroup } from "../line/line.service";

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI ?? "" } });
const TIME_ZONE = "Asia/Bangkok";
dayjs.extend(utc);
dayjs.extend(timezone);
export async function startJob(group: RotateSavingGroupDocument) {
  const now = dayjs();
  const fiveMinutesLater = now.add(1, "minute").toDate();

  const groupId = group._id;
  const period = group.period;
  const jobTimeBit = `job-time-bit-${groupId}-${period}`;
  const jobTimeBitBefore = `job-time-bit-before-${groupId}-${period}`;

  if (period && group.bitTime?.time) {
    const timeSplit = convertTimeStringToHourMinute(group.bitTime.time.toString());
    const timeBefore = findTimeBefore(group.bitTime.time.toString(), 5);
    // const timeSplit = convertTimeStringToHourMinute("23:33");
    // const timeBefore = findTimeBefore("23:33", 5);

    const timeBeforeSplit = convertTimeStringToHourMinute(timeBefore);

    // Set up Job Time Bit
    defindJobTimeBit(jobTimeBit, groupId, period);

    // Set up Job Time Bit before 5 minite
    defindJobTimeBitBefore(jobTimeBitBefore, groupId, period);

    const hour = Number(timeSplit?.h ?? 0);
    const minites = Number(timeSplit?.m ?? 0);
    const hourBefore = Number(timeBeforeSplit?.h ?? 0);
    const minitesBefore = Number(timeBeforeSplit?.m ?? 0);

    await agenda.start();
    await agenda.every(`${minites} ${hour} */1 * *`, jobTimeBit, { group });
    await agenda.every(`${minitesBefore} ${hourBefore} */1 * *`, jobTimeBitBefore, { group });
  }
}

// Job push message
export async function getJobs() {
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

export async function purgeJobs() {
  await agenda.purge();
}

export function defindJobTimeBit(jobName: string, groupId: string, period: string | undefined) {
  const jobTimeBit = `job-time-bit-${groupId}-${period}`;
  if (jobName !== jobTimeBit) return;
  console.log("DEFINED jobName : ", jobName);
  agenda.define<IRotateSavingGroup>(jobTimeBit, async (job: any) => {
    const group: RotateSavingGroupDocument = job?.attrs?.data?.group;
    if (group.groupLineId) {
      console.log(`~RUN~ push message successful ${jobTimeBit}`, group._id);
      pushMessageToGroup(group.groupLineId, "เริ่มต้น Bit");
    } else {
      console.log(`~RUN~ push message fail! ${jobTimeBit}`, group._id);
    }
  });
}

export function defindJobTimeBitBefore(jobName: string, groupId: string, period: string | undefined) {
  const jobTimeBitBefore = `job-time-bit-before-${groupId}-${period}`;
  if (jobName !== jobTimeBitBefore) return;
  console.log("DEFINED jobName : ", jobName);
  agenda.define<IRotateSavingGroup>(jobTimeBitBefore, async (job: any) => {
    const group: RotateSavingGroupDocument = job?.attrs?.data?.group;
    if (group.groupLineId) {
      console.log(`~RUN~ push message successful ${jobTimeBitBefore}`, group._id);
      pushMessageToGroup(group.groupLineId, "อักห้านาทีจะถึงเวลา Bit");
    } else {
      console.log(`~RUN~ push message fail! ${jobTimeBitBefore}`, group._id);
    }
  });
}

// Prepare defind all job
export function defineAllJob(jobName: string, groupId: string, period: string | undefined) {
  defindJobTimeBit(jobName, groupId, period);
  defindJobTimeBitBefore(jobName, groupId, period);
}

/**
 * Finds the time that is a specified number of minutes before the given time.
 * @param {string} time - The time string in "HH:mm" format.
 * @param {number} minutes - The number of minutes to subtract from the given time.
 * @returns {string} - The time string representing the time before the given time.
 */
function findTimeBefore(time: string, minutes: number): string {
  const [hours, minutesStr] = time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutesStr;
  totalMinutes -= minutes;
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
}
