import schedule from "node-schedule";
import { getJobs, purgeJobs } from "../services/job-schedule/job-schedule.service";

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

export async function DELETE() {
  try {
    const data = await purgeJobs();
    return Response.json({
      data,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
