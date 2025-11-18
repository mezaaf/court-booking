import { Prisma } from "@/generated/prisma/client";

export type CourtWithSchedule = Prisma.CourtGetPayload<{
  include: {
    schedules: true;
  };
}>;
