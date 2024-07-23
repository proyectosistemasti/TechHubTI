import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";
import React, { useState } from "react";

interface ScheduleViewProps {
  orgId: string;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ orgId }) => {
  const scheduleFile = useQuery(api.files.getScheduleFileUrl, { orgId });
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!scheduleFile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!scheduleFile.url) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No schedule file found.</p>
      </div>
    );
  }

  const handleImageClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${isFullScreen ? "bg-black" : "bg-gray-100"}`}>
      <div className={`${isFullScreen ? "fixed inset-0 z-50 flex justify-center items-center" : "w-full h-full max-w-7xl p-4 bg-white shadow-lg rounded-lg"}`}>
        <Image
          src={scheduleFile.url}
          alt={scheduleFile.name || "Schedule"}
          layout={isFullScreen ? "fill" : "responsive"}
          width={isFullScreen ? undefined : 1200}
          height={isFullScreen ? undefined : 1600}
          className={`object-cover rounded ${isFullScreen ? "cursor-zoom-out" : "cursor-zoom-in"} ${isFullScreen ? "w-full h-full" : "w-auto h-full"}`}
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default ScheduleView;
