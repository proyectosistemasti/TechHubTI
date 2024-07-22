// layout.tsx
export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {children}
    </div>
  );
}
