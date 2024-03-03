import schedule from "node-schedule";
import { getJobs } from "../services/job-schedule/job-schedule.service";

export async function GET() {
  try {
    return Response.json({
      data: getJobs(),
    });
  } catch (error) {
    return Response.json({ error });
  }
}
