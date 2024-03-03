import { models, model, Schema, Date, Document } from "mongoose";
import { DayOfMonth, DayOfWeek, JobStatus, Period, StatusGroup } from "@/app/constants/enum";
import { BitTime, PlayerGroup } from "@/app/interfaces/global.interface";

const JobScheduleSchema: Schema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    jobStatus: {
      type: String,
      enum: JobStatus,
    },
    group: { type: Schema.Types.ObjectId, ref: "RotateSavingGroup" },
    
  },
  { timestamps: true }
);

export interface IJobSchedule {}

const JobScheduleModel = models.JobSchedule || model("JobSchedule", JobScheduleSchema);
export interface JobScheduleDocument extends IJobSchedule, Document {}

export default JobScheduleModel;
