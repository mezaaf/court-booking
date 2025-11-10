"use client";

import DataTable from "@/components/common/DataTable";
import useDataTable from "@/hooks/useDataTable";
import { Schedule } from "@/types/schedule";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo } from "react";
import DialogSchedule from "../components/DialogSchedule";
import {
  DAY_OF_WEEK_LABELS,
  SCHEDULE_TABLE_HEADER,
} from "../constants/scheduleConstant";
import scheduleService from "../services/schedule";
import DialogDeleteSchedule from "../components/DialogDeleteSchedule";

const SchedulePage = () => {
  const { currentPage, currentLimit, handlePageChange, handleLimitChange } =
    useDataTable();

  const {
    data: scheduleResponse,
    isLoading,
    refetch: refetchSchedules,
  } = useQuery({
    queryKey: ["schedules", currentPage, currentLimit],
    queryFn: async () => {
      const res = await scheduleService.getAllschedules(
        currentPage,
        currentLimit
      );
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
    },
  });

  const schedules = scheduleResponse?.data.schedules as Schedule[];
  const total = scheduleResponse?.data.total;

  const filteredData = useMemo(() => {
    return (schedules || []).map((schedule, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        <div className="flex items-center gap-2" key={schedule.id}>
          <Image
            src={schedule.court.image as string}
            alt={schedule.court.name}
            width={40}
            height={40}
            className="rounded aspect-video w-12 object-cover object-center"
          />
          {schedule.court.name}
        </div>,
        <p key={schedule.id}>
          {
            Object.entries(DAY_OF_WEEK_LABELS).find(
              ([key]) => key === schedule.dayOfWeek.toString()
            )?.[1]
          }
        </p>,
        `${schedule.openTime} - ${schedule.closeTime}`,
        <div key={schedule.id} className="flex items-center gap-2">
          <DialogSchedule
            mode="update"
            refetchSchedules={refetchSchedules}
            scheduleId={schedule.id}
            initialValues={{
              courtId: schedule.courtId,
              dayOfWeek: schedule.dayOfWeek.toString(),
              openTime: schedule.openTime,
              closeTime: schedule.closeTime,
              isClosed: schedule.isClosed,
            }}
          />

          <DialogDeleteSchedule
            scheduleId={schedule.id}
            refetch={refetchSchedules}
          />
        </div>,
      ];
    });
  }, [currentLimit, currentPage, refetchSchedules, schedules]);
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Lapangan ({total})</h1>
        <div className="flex items-center gap-4">
          <DialogSchedule mode="create" refetchSchedules={refetchSchedules} />
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
      <DataTable
        header={SCHEDULE_TABLE_HEADER}
        isLoading={isLoading}
        data={filteredData}
        total={total}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default SchedulePage;
