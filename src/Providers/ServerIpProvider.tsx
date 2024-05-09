"use client";
import React, { useEffect } from "react";
interface IServerIpProvider {
  children: React.ReactNode;
}
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
interface IserverIp {
  serverIp: string;
  setServerIp: Dispatch<SetStateAction<string>>;
  handleChangeIp: (ChangeIp: string) => void;
}
export const ServerIpConfig = createContext<IserverIp>({
  setServerIp: () => {},
  serverIp: "0.0.0.0",
  handleChangeIp: () => {},
});
export const IP_STORAGE_KEY = "esp-ip";

export const ServerIpProvider = ({ children }: IServerIpProvider) => {
  const [serverIp, setServerIp] = useState("0.0.0.0");
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const espip = window.localStorage.getItem(IP_STORAGE_KEY);
    let espServerIp = "";
    if (!espip) {
      window.localStorage.setItem(IP_STORAGE_KEY, "0.0.0.0:3002");
      setServerIp("0.0.0.0:3002");
      return;
    }
    setServerIp(espip);
  });
  const handleChangeIp = (ChangeIp: string) => {
    console.log("ChangeIp: Context", ChangeIp)
    window.localStorage.setItem(IP_STORAGE_KEY, ChangeIp);
    setServerIp(ChangeIp);
  };
  return (
    <ServerIpConfig.Provider value={{ serverIp, setServerIp, handleChangeIp }}>
      {children}
    </ServerIpConfig.Provider>
  );
};

export default ServerIpProvider;
