import axios, { AxiosRequestConfig } from "axios";

export const pushMessageToGroup = async (groupId: string, messageText: string, messages?: any[]) => {
  try {
    const requestOptions: AxiosRequestConfig = {
      method: "post",
      url: `${process.env.LINE_API_ENDPOINT}/message/push`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
      data: {
        to: groupId,
        messages: messages
          ? messages
          : [
              {
                type: "text",
                text: messageText,
              },
            ],
      },
    };
    await axios(requestOptions);
  } catch (error) {
    throw new Error("Failed to send request to Line API");
  }
};

export const replyMessage = async (replyToken: string, messageText: string, messages?: any[]) => {
  try {
    const requestOptions: AxiosRequestConfig = {
      method: "post",
      url: `${process.env.LINE_API_ENDPOINT}/message/reply`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
      data: {
        replyToken,
        messages,
      },
    };
    await axios(requestOptions);
  } catch (error) {
    throw new Error("Failed to send request to Line API");
  }
};
