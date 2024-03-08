import { FlexBubble, FlexComponent, FlexMessage } from "@line/bot-sdk/dist/types";
import { IRotateSavingGroup } from "../services/rotate-saving-group/rotate-saving-group.model";
import { group } from "console";
import { PlayerGroup } from "@/app/interfaces/global.interface";

export const viewGroupInfo = (data: IRotateSavingGroup): FlexBubble => {
  return {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "ข้อมูลห้อง",
          weight: "bold",
          color: "#1DB446",
          size: "sm",
        },
        {
          type: "text",
          text: data?.ownerId.displayName,
          weight: "bold",
          size: "xxl",
          margin: "md",
        },
        {
          type: "text",
          text: "เจ้าของ",
          size: "xs",
          color: "#aaaaaa",
          wrap: true,
        },
        {
          type: "separator",
          margin: "xxl",
        },
        {
          type: "box",
          layout: "vertical",
          margin: "xxl",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "ส่ง",
                  size: "sm",
                  color: "#555555",
                  flex: 0,
                },
                {
                  type: "text",
                  text: data?.rotateAmount?.toString() || "",
                  size: "sm",
                  color: "#111111",
                  align: "end",
                },
              ],
            },
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "บิดขั้นต่ำ",
                  size: "sm",
                  color: "#555555",
                  flex: 0,
                },
                {
                  type: "text",
                  text: data?.minBitAmount?.toString() || "",
                  size: "sm",
                  color: "#111111",
                  align: "end",
                },
              ],
            },
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: "อั้นดอก",
                  size: "sm",
                  color: "#555555",
                  flex: 0,
                },
                {
                  type: "text",
                  text: data?.maxBitAmount?.toString() || "",
                  size: "sm",
                  color: "#111111",
                  align: "end",
                },
              ],
            },
            {
              type: "separator",
              margin: "xxl",
            },
            ...(renderListPLayer(data?.players) as FlexComponent[]),
          ],
        },
        {
          type: "separator",
          margin: "xxl",
        },
        {
          type: "box",
          layout: "horizontal",
          margin: "md",
          contents: [
            {
              type: "text",
              text: "Status",
              size: "xs",
              color: "#aaaaaa",
              flex: 0,
            },

            {
              type: "text",
              text: data?.roomStatus || "",
              color: "#aaaaaa",
              size: "xs",
              align: "end",
            },
          ],
        },
      ],
    },
    styles: {
      footer: {
        separator: true,
      },
    },
  };
};

const renderListPLayer = (players?: PlayerGroup[]): FlexComponent[] => {
  if (!players || players?.length === 0) {
    return [
      {
        type: "box",
        layout: "horizontal",
        margin: "xxl",
        contents: [
          {
            type: "text",
            text: "ยังไม่มีผู้สมาชิกในห้อง",
            size: "sm",
            color: "#555555",
          },
        ],
      },
    ];
  }
  return players?.map((e) => {
    return {
      type: "box",
      layout: "horizontal",
      margin: "xxl",
      contents: [
        {
          type: "text",
          text: e.displayName || "",
          size: "sm",
          color: "#555555",
        },
      ],
    };
  });
};
