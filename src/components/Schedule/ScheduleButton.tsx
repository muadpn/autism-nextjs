"use client";
import React, { MouseEvent } from "react";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

const ScheduleButton = ({ scheduleId }: { scheduleId: string }) => {
  const { toast } = useToast();
  const handleCancleSchedule = async (e: MouseEvent, scheduleId: string) => {
    e.preventDefault();
    try {
      const res = await axios.post("http:localhost:8600/api/cancel-schedule", {
        scheduleId: scheduleId,
      });
      if (res.status === 200) {
        toast({
          description: "Schedule Canceled successfully",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data.message ?? "Something went wrong";

        toast({
          description: message,
        });
      }
    }
  };
  return (
    <Button
      variant={"secondary"}
      onClick={(e) => handleCancleSchedule(e, scheduleId)}
    >
      Cancel
    </Button>
  );
};

export default ScheduleButton;
