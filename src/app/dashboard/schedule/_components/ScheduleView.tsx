import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";

const ScheduleView = ({ orgId }: { orgId: string }) => {
  const scheduleFile = useQuery(api.files.getScheduleFileUrl, { orgId });

  if (!scheduleFile) {
    return <div>Loading...</div>;
  }

  if (!scheduleFile.url) {
    return <div>No schedule file found.</div>;
  }

  return (
    <div className="flex justify-center">
      <Image src={scheduleFile.url} alt={scheduleFile.name} width={800} height={600} className="object-contain" />
    </div>
  );
};

export default ScheduleView;
