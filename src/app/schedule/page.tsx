import Schedule from "@/components/Schedule/Schedule";
import ShowSchedules from "@/components/Schedule/ShowSchedules";
import UploadScheduleFiles from "@/components/Schedule/UploadScheduleFiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { Suspense } from "react";
import { LuGalleryHorizontal } from "react-icons/lu";

const Page = async () => {
  const [files, schedules] = await Promise.all([
    await db.file.findMany({}),
    await db.schedule.findMany({
      where: {
        time: {
          gt: new Date(Date.now()),
        },
      },
    }),
  ]);
  return (
    <div className="app_bg p-2">
      <div className=" flex items-center justify-center flex-col my-12">
        <h1 className="text-7xl  font-bold tracking-tight ">Voice Changer</h1>
        <p className="max-w-prose text-center mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          voluptatibus fugit voluptatem sunt ducimus quibusdam explicabo omnis
          similique in amet.
        </p>
      </div>
      <div className="grid place-items-center grid-cols-2">
        {files && files.length > 0 ? <Schedule files={files} /> : null}
        <div className="self-start">
          <h1 className="text-4xl font-medium">Upload Schedule voice&apos;s</h1>
          {!files || files.length === 0 ? (
            <div className=" ">
              <p className="text-white animate-pulse">
                Please Upload files for starting Schedules
              </p>
            </div>
          ) : (
            <p className="max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
              aliquam obcaecati voluptatum consequatur deleniti odit?
            </p>
          )}
          <UploadScheduleFiles />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        {!files || files.length === 0 ? (
          <div className=" ">
            <p className="text-white animate-pulse">
              Please Upload files for starting Schedules
            </p>
          </div>
        ) : null}
        <div className="w-full flex items-center justify-center mt-12">
          <ShowSchedules schedules={schedules} />
        </div>
      </div>
    </div>
  );
};

export default Page;
