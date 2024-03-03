import dbConnect from "@/app/libs/mongodb";

export async function GET() {
  try {
    return Response.json({ message: "Test for line send meesage" });
  } catch (error) {
    return Response.json({ error });
  }
}
