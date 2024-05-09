"use client";
import "./Navbar.css";
import { logo } from "../../assets";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { MouseEvent, useContext, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { ServerIpConfig } from "@/Providers/ServerIpProvider";
import { Button } from "../ui/button";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { serverIp, handleChangeIp, setServerIp } = useContext(ServerIpConfig);
  const [openDialog, setOpenDialog] = useState(false);
  const [ChangeIP, setChangeIP] = useState("");
  // console.log("ChangeIP:", ChangeIP);
  const handleChangeIpAddress = (e: MouseEvent) => {
    e.preventDefault();
    handleChangeIp(ChangeIP);
  };

  return (
    <nav className="navbar app_bg">
      <figure className="navbar_logo"></figure>
      <div className="navbar_links">
        <Link href="/" className="p_poppins">
          Home
        </Link>
        <Link href="/schedule" className="p_poppins">
          Schedule
        </Link>
        <Link href="/voice" className="p_poppins">
          Voice Change
        </Link>
        <a href="#solution" className="p_poppins">
          Analysis
        </a>
      </div>
      <Dialog open={openDialog} onOpenChange={(v) => setOpenDialog(v)}>
        <DialogTrigger>Change IP</DialogTrigger>
        <DialogContent>
          <DialogHeader>Change Ip</DialogHeader>
          <DialogDescription>
            You are Currently Connected to : {serverIp}
          </DialogDescription>
          <div className="mt-4 flex items-center flex-col gap-4 ">
            <Input
              value={ChangeIP}
              onChange={(e) => setChangeIP(e.target.value)}
              placeholder="0.0.0.0:3000"
            />
            <Button onClick={handleChangeIpAddress}>Change</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="navbar-smallscreens">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-smallscreens">
            <div className="navbar_links-smallscreens">
              <a href="#home" className="p_poppins">
                Home
              </a>
              <a href="#aboutus" className="p_poppins">
                Schedule
              </a>
              <a href="#features" className="p_poppins">
                Voice Change
              </a>
              <a href="#solution" className="p_poppins">
                Analysis
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
