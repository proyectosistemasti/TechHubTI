import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Eliminar archivos marcados para eliminación cada minuto
crons.interval(
  "Delete any old files marked for deletion",
  { minutes: 24 * 60},
  internal.files.deleteAllFiles,
);

// Eliminar archivos de categoría "schedule" los lunes a las 0:00 hrs
crons.weekly(
  "Delete schedule files every Monday at 00:00",
  { hourUTC: 5, minuteUTC: 0, dayOfWeek: 'monday' },
  internal.files.deleteScheduleFiles,
);

export default crons;
