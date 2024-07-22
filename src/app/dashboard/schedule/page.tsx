'use client'
import ScheduleView from "./_components/ScheduleView";

export default function SchedulePage() {
  const orgId = "org_2jG3xWimiJbqu9mlewvsauwNgTl"; // Reemplaza "your-org-id" con el ID de tu organización

  return (
    <div>
      <ScheduleView orgId={orgId} />
    </div>
  );
}
