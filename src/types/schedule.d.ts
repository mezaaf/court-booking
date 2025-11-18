import { Prisma } from "@/generated/prisma/client";

export type Schedule = Prisma.ScheduleGetPayload<{
  select: {
    id: true;
    courtId: true;
    dayOfWeek: true;
    openTime: true;
    closeTime: true;
    isClosed: true;
    court: { select: { id: true; name: true; image: true } };
  };
}>;
