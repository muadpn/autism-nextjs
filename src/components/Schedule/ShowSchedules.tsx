import React, { MouseEvent } from "react";
import { format } from "date-fns";
import Schedule from "./Schedule";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { schedule } from "@prisma/client";
import { Button } from "../ui/button";
import ScheduleButton from "./ScheduleButton";
interface IShowSchedules {
  schedules: schedule[];
}
const ShowSchedules = ({ schedules }: IShowSchedules) => {
  const scheduleStatus = {
    Active: schedules.filter((p) => p.status === "PENDING").length,
    Excecuted: schedules.filter((p) => p.status === "EXCECUTED").length,
  };

  return (
    <div className=" w-full max-w-2xl self-start mb-12">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl font-medium">Scheduled</h1>
        <p className="max-w-prose text-center mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          necessitatibus?
        </p>
      </div>
      <div>
        <div className=" border-[2px] w-full rounded-2xl border-gray-800  p-2">
          <Table className="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium max-w-[150px] truncate   ">
                  id
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="">Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className=" max-w-[150px] truncate ">
                    {schedule.id}
                  </TableCell>
                  <TableCell>{schedule.ScheduleName}</TableCell>
                  <TableCell>{format(schedule.time, "dd/MM hh-m")}</TableCell>
                  <TableCell className="">{schedule.status}</TableCell>
                  <TableCell className="">
                    <ScheduleButton scheduleId={schedule.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-slate-950 ">
              <TableRow className="">
                <TableCell colSpan={1}>Total Active</TableCell>
                <TableCell className="text-center">
                  {scheduleStatus.Active}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>Total Excecuted</TableCell>
                <TableCell className="text-center">
                  {scheduleStatus.Excecuted}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ShowSchedules;
