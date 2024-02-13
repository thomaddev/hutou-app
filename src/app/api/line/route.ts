import dbConnect from "@/app/libs/mongodb";
import * as line from "@line/bot-sdk";

new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
});
line.middleware({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
  channelSecret: process.env.CHANNEL_SECRET as string,
});

export async function POST(request: Request) {
  try {
    const res = await request.json();
    // console.log(res);
    // console.log(res.events[0].message);
    console.log(res.events[0].source);
    const type = res.events[0].type;
    console.log({type});
    switch (type) {
      case "message":
        // ลงทะเบียนเปิดห้อง
        const messageText = res.events[0].message.text;
        const replyToken = res.events[0].replyToken;
        if (messageText === "ลงทะเบียนเปิดห้อง") {
          replyMessage(replyToken, "เข้าสู่ขั้นตอนลงทะเบียนห้อง");
        }



        console.log('testestset')
        const { userId, groupId, type } = res.events[0].source;
        const client = new line.messagingApi.MessagingApiClient({
          channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
        });
        const t = await client.getProfile(userId);
        console.log(t)

        break;
      default:
       
        break;
    }
    return Response.json({ message: "Test for line send meesage" });
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
}

const replyMessage = (replyToken: string, messageText: string) => {
  const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
  });
  client.replyMessage({
    replyToken,
    messages: [
      {
        type: "text",
        text: messageText,
      },
    ],
  });
};
