import schedule from "node-schedule";
import { getJobs } from "../services/job-schedule/job-schedule.service";

export async function GET() {
  try {
    const data = await getJobs();
    return Response.json({
      data,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
