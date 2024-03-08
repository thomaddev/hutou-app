import dbConnect from "@/app/libs/mongodb";
import RotateSavingGroupModel, { IRotateSavingGroup, RotateSavingGroupDocument } from "./rotate-saving-group.model";
import { StatusGroup } from "@/app/constants/enum";
import { IPlayer } from "../player/player.model";
import { createPlayer } from "../player/player.service";
import { pushMessageToGroup } from "../line/line.service";
import schedule from "node-schedule";
import dayjs from "dayjs";
import { startJob } from "../job-schedule/job-schedule.service";
import { PlayerGroup } from "@/app/interfaces/global.interface";

export async function createGroup(rotateSavingGroupData: IRotateSavingGroup): Promise<IRotateSavingGroup> {
  try {
    await dbConnect();
    // Check group is resgitered
    const checkExisted = await RotateSavingGroupModel.findOne({ groupLineId: rotateSavingGroupData?.groupLineId });
    if (checkExisted) {
      throw new Error("ห้องนี้ทำการลงทะเบียนแล้ว กรุณาติดต่อ admin เพื่อทำขั้นตอนถัดไป (ส่งลิ่ง)");
    }

    const newGroup = new RotateSavingGroupModel({
      ...rotateSavingGroupData,
      roomStatus: StatusGroup.CREATED,
    });
    const savedGroup = await newGroup.save();
    return savedGroup;
  } catch (error: any) {
    throw error;
  }
}

export async function getOneGroup(groupLineId: string): Promise<IRotateSavingGroup> {
  try {
    await dbConnect();
    const group = await RotateSavingGroupModel.findOne({ groupLineId: groupLineId });
    if (!group) throw new Error("น้องไม่พบห้อง ลงทะเบียนก่อนงับ");
    return group;
  } catch (error: any) {
    throw error;
  }
}

export async function addPlayersToGroup(groupId: string, players: IPlayer[]): Promise<IRotateSavingGroup> {
  try {
    await dbConnect();
    // Create player if not existed
    let playersRoom: PlayerGroup[] = [];
    for (const player of players) {
      const insertPlayer = await createPlayer(player);
      playersRoom.push({
        userLineId: insertPlayer.userLineId,
        displayName: insertPlayer?.displayName || "",
      });
    }

    const group: RotateSavingGroupDocument | null = await RotateSavingGroupModel.findOne({ groupLineId: groupId });
    if (!group) {
      throw new Error("Can not ground Group");
    }
    const oldPlayers = group.players || [];

    // filter Unique Player
    const uniquePlayers: PlayerGroup[] = getUniquePlayers(playersRoom);

    // check player full?
    // if (uniquePlayers.length > (group.playerCount || 0)) {
    //   throw new Error("Player Full");
    // }

    // Check should not owner in player
    if (uniquePlayers.some((e) => e.userLineId === group.ownerId.userLineId)) {
      throw new Error("cannot have owner in player room");
    }

    // set unique players and merge with old players
    group.players = [...oldPlayers, ...uniquePlayers];
    await group.save();

    return group;
  } catch (error: any) {
    throw error;
  }
}

const getUniquePlayers = (players: PlayerGroup[]) => {
  const uniqueMap = new Map();
  players.forEach((player) => {
    const value = player.userLineId;
    if (!uniqueMap.has(value)) {
      uniqueMap.set(value, player);
    }
  });
  return Array.from(uniqueMap.values());
};

export const startRoomPlay = (group: RotateSavingGroupDocument) => {
  console.log("PREAPRE START JOB!")
  if (group.roomStatus === StatusGroup.PLAYING) {
    if (group.groupLineId) {
      const msg = "วง​ {test} แชร์ต้น 20,000❤️ \n ⛔️ราย วัน เริ่มสิ้นเดือน ธันวาคม \n ⛔️ส่ง 2000 \n ⛔️บิดดอกขั้นต่ำ 500 อั้นดอก \n 1000 \n 📌บิทเวลา 19.45-19.47 น. \n ⛔️ใครใส่1,000 คนแรกรับไป \n ⛔️ไม่มีคนบิดหมุนเสียดอก 400";
      // pushMessageToGroup(group.groupLineId, "เริ่มรอบที่ 1 \n" + msg);

      // const now = dayjs();

      // // Calculate the time 5 minutes from now
      // const fiveMinutesLater = now.add(1, "minute").toDate();

      // console.log("JOB RUNNED!")
      // // set cron bit time
      // const job = schedule.scheduleJob('testJob1', fiveMinutesLater, function (fireDate) {
      //   console.log("This job was supposed to run at " + fireDate + ", but actually ran at " + new Date());
      // });

      startJob(group);

      // const jobs = schedule.scheduledJobs;
      // console.log({ job });
    }
  }
};
