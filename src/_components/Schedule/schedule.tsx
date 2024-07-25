'use client'
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import React, { useState } from "react";

const ScheduleImage: React.FC = () => {
  const orgId = "org_2jhUhTHQQzKyBPYxPA3609WTc2R";
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
      <div className={`${isFullScreen ? "fixed inset-0 z-50 flex justify-center items-center" : "p-4 bg-white shadow-lg rounded-lg"}`}>
        <Image
          src={scheduleFile.url}
          alt={scheduleFile.name || "Schedule"}
          width={isFullScreen ? 1600 : 1200}
          height={isFullScreen ? 1200 : 800}
          className={`object-contain rounded ${isFullScreen ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default ScheduleImage;
