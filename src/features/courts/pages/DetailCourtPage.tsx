"use client";

import { courtServices } from "@/services/public/courtServices";
import { CourtWithSchedule } from "@/types/courtWithSchedule";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import ScheduleCard from "../components/ScheduleCard";

const DetailCourtPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: courtDetail, isLoading } = useQuery({
    queryKey: ["courtDetail", id],
    queryFn: async () => {
      const res = await courtServices.getCourtById(id);
      if (res.status !== 200) return null;
      return res.data as CourtWithSchedule;
    },
  });
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 min-h-screen">
      <h1 className="text-center font-bold text-4xl text-sky-700 mt-4 sm:mt-6 lg:mt-8">
        Detail Lapangan {courtDetail?.name}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : courtDetail ? (
        <div className="w-full flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full rounded-lg max-h-[500px] overflow-hidden">
            <Image
              src={courtDetail.image ?? ""}
              alt={courtDetail.name}
              width={1200}
              height={720}
              className="w-full object-cover object-center"
            />
          </div>
          {courtDetail.description && (
            <p className="text-center text-lg sm:text-xl lg:text-2xl text-gray-700">
              {courtDetail.description}
            </p>
          )}
          <h1 className="text-2xl font-semibold text-center">
            Jam Operasional
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {courtDetail.schedules.length <= 0 ? (
              <p className="text-center col-span-full">
                Belum ada jadwal operasional
              </p>
            ) : (
              courtDetail.schedules.map((schedule) => (
                <ScheduleCard key={schedule.id} schedule={schedule} />
              ))
            )}
          </div>
        </div>
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </div>
  );
};

export default DetailCourtPage;
