import { startAgenda } from "@/app/libs/agenda-job";
export async function GET() {
  try {
    await startAgenda();
    return Response.json({
      message: "Start job",
    });
  } catch (error) {
    return Response.json({ error });
  }
}
