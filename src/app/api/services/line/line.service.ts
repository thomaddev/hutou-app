import * as line from "@line/bot-sdk";

export const pushMessageToGroup = (groupId: string, messageText: string) => {
  const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
  });
  client.pushMessage({
    to: groupId,
    messages: [
      {
        type: "text",
        text: messageText,
      },
    ],
  });
};
