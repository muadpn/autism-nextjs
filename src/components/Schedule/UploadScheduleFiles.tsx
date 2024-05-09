"use client";
// import { Input } from "postcss";
import React, { useContext, useState } from "react";
import { Input } from "../ui/input";
import { fileData } from "@/app/voice/page";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { ServerIpConfig } from "@/Providers/ServerIpProvider";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { scheduleAction } from "@/Actions/ScheduleAction";

const UploadScheduleFiles = () => {
  const { serverIp } = useContext(ServerIpConfig);
  const router = useRouter();
  const [data, setData] = useState<fileData>({
    file: null,
    fileName: null,
  });
  const { toast } = useToast();
  const handleFile = async (e: MouseEvent) => {
    e.preventDefault();
    if (!data.fileName) {
      toast({
        title: "Invalid Data selected",
        description: "Please select a File to replace",
      });
      return;
    }
    if (data.fileName.includes(".")) {
      toast({
        title: "Cannot include a extension or '.' in file name",
        description: "Please select a File to replace",
      });
      return;
    }
    const parsedFilename = `${data.fileName.replace(" ", "")}.wav`;
    if (!data.file?.length || !data.file) {
      toast({
        title: "Invalid Data selected",
        description: "Please select a audio file",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file[0], parsedFilename);
    try {
      const res = await axios.post(
        `http://${serverIp}/api/schedule-upload`,
        formData,
        {
          headers: {
            "Content-Type": "form-data",
          },
        }
      );
      let message = res.data;
      if (typeof message !== "string") {
        message = "Something went wrong";
      }
      if (res.status !== 200) {
        toast({
          title: "Something went wrong",
          description: message,
        });
        return;
      }
      const ScheduleDb = await scheduleAction({
        fileName: parsedFilename,
      });
      console.log(ScheduleDb);
      if (ScheduleDb.status !== 200) {
        toast({
          title: "Something went wrong, While Saving to Database",
          description: ScheduleDb.message,
        });
        return;
      }
      toast({
        title: "File uploaded succesfully",
      });
      router.refresh();
      return;
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
      });
    } finally {
      setData({
        file: null,
        fileName: null,
      });
    }
  };
  return (
    <div className="flex items-center justify-center  max-w-sm w-full ">
      <div className="max-w-sm">
        <form action="">
          <div className="flex items-center justify-center gap-2 flex-col p-2">
            <Input
              onChange={(e) =>
                setData((prev) => {
                  return {
                    ...prev,
                    fileName: e.target.value,
                  };
                })
              }
              placeholder="filename"
            />
            <Input
              type="file"
              className="placeholder:text-white  text-white file:text-white "
              placeholder="File"
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    file: e.target.files,
                  };
                });
              }}
            />
            <p>Please choose only wav Files.</p>
            <Button>Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadScheduleFiles;
