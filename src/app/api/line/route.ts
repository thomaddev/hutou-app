import dbConnect from "@/app/libs/mongodb";
import * as line from "@line/bot-sdk";
import { createPlayer } from "../services/player/player.service";
import { IPlayer, PlayerDocument } from "../services/player/player.model";
import { IRotateSavingGroup } from "../services/rotate-saving-group/rotate-saving-group.model";
import { addPlayersToGroup, createGroup, getOneGroup } from "../services/rotate-saving-group/rotate-saving-group.service";
import { StatusGroup } from "@/app/constants/enum";
import { viewGroupInfo } from "../line-views/flex-bubbles";
import axios, { AxiosRequestConfig } from "axios";

new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
});
line.middleware({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
  channelSecret: process.env.CHANNEL_SECRET as string,
});
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
});
const LINE_CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
const LINE_API_ENDPOINT = "https://api.line.me/v2/bot/message";

async function sendLineRequest(options: AxiosRequestConfig): Promise<void> {
  try {
    await axios(options);
  } catch (error) {
    throw new Error("Failed to send request to Line API");
  }
}

const replyMessage2 = (replyToken: string, messages: any[]) => {
  const requestOptions: AxiosRequestConfig = {
    method: "post",
    url: LINE_API_ENDPOINT + "/reply",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    data: {
      replyToken,
      messages,
    },
  };
  sendLineRequest(requestOptions);
};

const pushMessage2 = (to: string, messages: []) => {
  const requestOptions: AxiosRequestConfig = {
    method: "post",
    url: LINE_API_ENDPOINT + "/push",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    data: {
      to,
      messages,
    },
  };
  sendLineRequest(requestOptions);
};

export async function POST(request: Request) {
  const res = await request.json();
  const typeMessage = res.events[0]?.type;
  const replyToken = res.events[0]?.replyToken;
  const { userId, groupId, type } = res.events[0]?.source;
  try {
    console.log(res);
    if (typeMessage === "message") {
      const messageText = res.events[0].message.text;
      const profile = await client.getProfile(userId);
      if (messageText === "ลงทะเบียนเปิดห้อง") {
        regsiterRoom(replyToken, res.events[0]?.source, profile);
      } else if (messageText === "ดูข้อมูลห้อง") {
        const groupData = await getOneGroup(groupId);
        console.log({ groupData });
        console.log("Start client send message");
        const messages = [
          {
            type: "flex",
            altText: "This is a Flex Message",
            contents: {
              ...viewGroupInfo(groupData),
            },
          },
        ];
        replyMessage2(replyToken, messages);
        // client
        //   .pushMessage({
        //     to: groupId,
        //     messages: [
        //       {
        //         type: "flex",
        //         altText: "This is a Flex Message",
        //         contents: {
        //           ...viewGroupInfo(groupData),
        //         },
        //       },
        //     ],
        //   })
        //   .then(() => {
        //     console.log("send success");
        //   })
        //   .catch(() => {
        //     console.log("send catch error");
        //   });
      } else if (messageText === "help") {
        const messages = [
          {
            type: "text",
            text: "ต้องการช่วยเหลืออะไร เลือกเมนูลัดด้านบนได้เลยงับ",
            quickReply: {
              items: [
                {
                  type: "action",
                  imageUrl: "https://cdn1.iconfinder.com/data/icons/basic-ui-169/32/Login-512.png",
                  action: {
                    type: "message",
                    label: "ลงทะเบียนเปิดห้อง",
                    text: "ลงทะเบียนเปิดห้อง",
                  },
                },
                {
                  type: "action",
                  imageUrl: "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-2/24/chat-info-512.png",
                  action: {
                    type: "message",
                    label: "ดูข้อมูลห้อง",
                    text: "ดูข้อมูลห้อง",
                  },
                },
              ],
            },
          },
        ];
        replyMessage2(replyToken, messages);
        // client.pushMessage({
        //   to: groupId,
        //   messages: [
        //     {
        //       type: "text",
        //       text: "ต้องการช่วยเหลืออะไร เลือกเมนูลัดด้านบนได้เลยงับ",
        //       quickReply: {
        //         items: [
        //           {
        //             type: "action",
        //             imageUrl: "https://cdn1.iconfinder.com/data/icons/basic-ui-169/32/Login-512.png",
        //             action: {
        //               type: "message",
        //               label: "ลงทะเบียนเปิดห้อง",
        //               text: "ลงทะเบียนเปิดห้อง",
        //             },
        //           },
        //           {
        //             type: "action",
        //             imageUrl: "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-2/24/chat-info-512.png",
        //             action: {
        //               type: "message",
        //               label: "ดูข้อมูลห้อง",
        //               text: "ดูข้อมูลห้อง",
        //             },
        //           },
        //         ],
        //       },
        //     },
        //   ],
        // });
      } else if (messageText === "ดูข้อมูลแบบดิบๆจ่ะแม่") {
      } else {
      }
    } else if (typeMessage === "memberLeft") {
      const left = res.events[0].left;

      // check IF Room playing can not kick anyone only
      // const group = await getOneGroup(groupId);
    } else if (typeMessage === "memberJoined") {
      const joined = res.events[0].joined;
      joined.members.forEach(async (element: { type: string; userId: string }) => {
        if (element.type === "user") {
          const profileGroupMember = await client.getGroupMemberProfile(groupId, element.userId);
          // Add Player to group
          await addMemberToGroup(replyToken, groupId, profileGroupMember);
        }
      });
    }

    return Response.json({ message: "Test for line send meesage" });
  } catch (error: any) {
    client.replyMessage({
      replyToken,
      messages: [
        {
          type: "text",
          text: error?.message,
        },
      ],
    });
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

const addMemberToGroup = async (replyToken: string, groupId: string, profileGroupMember: any) => {
  const result = await addPlayersToGroup(groupId, [
    {
      isOwner: false,
      userLineId: profileGroupMember.userId,
      displayName: profileGroupMember.displayName,
      pictureUrl: profileGroupMember.pictureUrl,
    },
  ]);
  replyMessage(replyToken, `ยินดีต้อนรับ คุณ ${profileGroupMember.displayName} เข้าสู่กลุ่ม`);
};

const regsiterRoom = async (replyToken: string, source: any, profile: line.messagingApi.UserProfileResponse) => {
  const { userId, groupId, type } = source;
  const playerData: IPlayer = {
    isOwner: true,
    userLineId: userId,
    pictureUrl: profile.pictureUrl,
    displayName: profile.displayName,
  };
  const insertedPlayer: IPlayer = await createPlayer(playerData);

  // Create Group Rotate Saving
  const groupData: IRotateSavingGroup = {
    ownerId: {
      userLineId: insertedPlayer.userLineId,
      displayName: insertedPlayer.displayName!,
    },
    groupLineId: groupId,
  };
  const insertedGroup = await createGroup(groupData);
  replyMessage(replyToken, "สร้างห้องสำเร็จ กรุณาติดต่อ admin เพื่อทำขั้นตอนถัดไป (ส่งลิ่ง)");
};
