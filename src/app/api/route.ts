import dbConnect from "@/app/libs/mongodb";

export async function GET() {
  try {
    console.log(process.env.CHANNEL_ACCESS_TOKEN);
    return Response.json({ message: "Test for line send meesage" });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}
