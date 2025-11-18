import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DAY_OF_WEEK_LABELS } from "@/features/admin/schedules/constants/scheduleConstant";
import { Schedule } from "@/generated/prisma/client";

const ScheduleCard = ({ schedule }: { schedule: Schedule }) => {
  return (
    <Card className="bg-sky-700">
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-4 text-white">
          {
            Object.entries(DAY_OF_WEEK_LABELS).find(
              ([key]) => key === schedule.dayOfWeek.toString()
            )?.[1]
          }
          <h1 className="text-2xl font-semibold">
            {schedule.openTime} - {schedule.closeTime} WIB
          </h1>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ScheduleCard;
