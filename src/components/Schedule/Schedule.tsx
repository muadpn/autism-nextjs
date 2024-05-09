"use client";
import React, {
  MouseEvent,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { file } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ServerIpConfig } from "@/Providers/ServerIpProvider";
import axios, { Axios, AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
type Schedule = {
  fileId: string | null;
  time: Date | null;
  ScheduleName: string | null;
};
interface ISchedulePage {
  files: file[];
}
const Schedule = ({ files }: ISchedulePage) => {
  const { serverIp, handleChangeIp, setServerIp } = useContext(ServerIpConfig);
  const { toast } = useToast();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const [scheduleData, setData] = useState<Schedule>({
    fileId: "",
    ScheduleName: "",
    time: new Date(),
  });

  const handleSchedule = async (e: MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      const dataToSend = {
        ...scheduleData,
        serverIp,
      };
      const res = await axios.post(
        "http://localhost:8600/api/add-task",
        dataToSend
      );
      console.log("res:\n", res);
      const response = res.data;
      // console.log(response)
      if (res.status !== 200) {
        toast({
          title: "Something went wrong",
          description: response.message ? response.message : "",
        });

        toast({
          title: "",
          description: response.message ? response.message : "",
        });
      }
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        const message = error.response?.data.message;
        console.log(message);
        toast({
          description: message ? message : "Something went wrong!",
        });
        return;
      }
      console.log("error", error);
      toast({
        title: "Something went wrong",
      });
    }
    router.refresh();
    setIsFetching(false);
  };
  return (
    <div className="self-start">
      <div className="flex items-center justify-center flex-col ">
        <h1 className="text-4xl font-medium">Make a schedule</h1>
        <p className="max-w-prose text-center mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          necessitatibus?
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center mt-12 max-w-sm w-full flex-col gap-2">
          <Input
            onChange={(e) =>
              setData((prev) => {
                return {
                  ...prev,
                  ScheduleName: e.target.value,
                };
              })
            }
            placeholder="Unique Schedule Name"
          />
          <Select
            onValueChange={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  fileId: e,
                };
              });
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Replace Audio" />
            </SelectTrigger>
            <SelectContent>
              {files.map((item, i) => {
                return (
                  <SelectItem value={item.id} key={`${item.id}`}>
                    {item.filename}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Input
            type="datetime-local"
            className="schedule-picker flex items-center justify- w-full  [&::-webkit-calendar-picker-indicator]:bg-slate-900 [&::-webkit-calendar-picker-indicator]:p-2 [&::-webkit-calendar-picker-indicator]:rounded-md [&::-webkit-calendar-picker-indicator]:stroke-white"
            onChange={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  time: new Date(e.target.value),
                };
              });
            }}
          />
          <Button
            disabled={isFetching}
            className="w-full"
            onClick={handleSchedule}
          >
            {isFetching ? (
              <div className="flex items-center justify-center gap-1">
                Setting schedule...
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Set Schedule"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
