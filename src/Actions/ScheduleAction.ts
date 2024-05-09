"use server";
import {
  ScheduleValidator,
  TScheduleValidator,
} from "@/Validators/ScheduleValidtor";
import { db } from "@/db";
import "server-only";
export const scheduleAction = async (data: TScheduleValidator) => {
  try {
    const ParsedData = ScheduleValidator.parse(data);
    if (!ParsedData.fileName.endsWith(".wav")) {
      return {
        status: 400,
        message: "Please only .wav files",
      };
    }
    await db.file.create({
      data: {
        filename: ParsedData.fileName,
        status: "UPLOADED",
      },
    });
    return {
      status: 200,
      message: "File saved successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong, Please try again.",
    };
  }
};
