'use client'
import ScheduleView from "./_components/ScheduleView";

export default function SchedulePage() {
  const orgId = "org_2jhUhTHQQzKyBPYxPA3609WTc2R"; // Reemplaza "your-org-id" con el ID de tu organización

  return (
    <div>
      <ScheduleView orgId={orgId} />
    </div>
  );
}
