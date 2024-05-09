"use client";
import { ServerIpConfig } from "@/Providers/ServerIpProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
// import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { CloudCog } from "lucide-react";
import React, {
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
const IP_STORAGE_KEY = "esp-ip";
export type fileData = {
  file: null | FileList;
  fileName: null | string;
};
const page = () => {
  // const [serverIp, setServerIp] = useState("0.0.0.0:3002");
  // const [ChangeIP, setChangeIP] = useState(serverIp);
  const { serverIp, handleChangeIp, setServerIp } = useContext(ServerIpConfig);
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const espip = window.localStorage.getItem(IP_STORAGE_KEY);
    let espServerIp = "";
    if (!espip) {
      window.localStorage.setItem(IP_STORAGE_KEY, "0.0.0.0:3002");
      setServerIp("0.0.0.0:3002");
      return;
    }
    setServerIp(espip);
  });
  const [data, setData] = useState<fileData>({
    file: null,
    fileName: null,
  });
  const indexer = new Array(24).fill(null).map((item, i) => {
    return `${i}.wav`;
  });

  const handleFile = async (e: MouseEvent) => {
    e.preventDefault();
    if (!data.fileName) {
      toast({
        title: "Invalid Data selected",
        description: "Please select a File to replace",
      });
      return;
    }
    if (!data.fileName.endsWith(".wav")) {
      toast({
        title: "Invalid Data selected",
        description: "Please select a .wav file to upload.",
      });
      return;
    }
    if (!data.file?.length || !data.file) {
      toast({
        title: "Invalid Data selected",
        description: "Please select a audio file",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", data.file[0], data.fileName);
    try {
      const res = await axios.post(`http://${serverIp}/api/upload`, formData, {
        headers: {
          "Content-Type": "form-data",
        },
      });
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
      toast({
        title: "File uploaded succesfully",
      });
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
    <div className="app_bg  w-full h-full ">
      <div className="mt-24 my-6 flex items-center justify-center flex-col">
        <h1 className=" text-4xl font-medium">Change Voice</h1>
        <p className="text-base max-w-prose text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          consequuntur incidunt asperiores fugit excepturi ducimus quae
          voluptatibus aliquid quibusdam perspiciatis.
        </p>
        <p className="text-lg my-4">
          You are currently Listening to
          <span> {serverIp} </span>
        </p>
      </div>
      <div className="flex items-center  gap-2 justify-center w-full h-full">
        <form action="">
          <div className="flex gap-2 max-w-md">
            <div className="flex flex-col items-start justify-center gap-4">
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
              <div className="flex items-center justify-between w-full gap-2">
                <Select
                  onValueChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        fileName: e,
                      };
                    })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Replace Audio" />
                  </SelectTrigger>
                  <SelectContent>
                    {indexer.map((item, i) => {
                      return (
                        <SelectItem value={item} key={`${item}+${i}`}>
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {/* <div className=" flex items-center justify-center mt-4"> */}
                <Button type="submit" onClick={handleFile}>
                  Submit
                </Button>
                {/* </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
