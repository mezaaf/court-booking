"use client";
import PaginationData from "@/components/common/PaginationData";
import { Court } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CourtCard from "./CourtCard";
import { courtServices } from "@/services/public/courtServices";

const CourtSection = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) ?? 1;
  const currentLimit = Number(searchParams.get("limit")) ?? 3;
  console.log(currentPage);
  const { data: activeCourtsResponse, refetch: refetchActiveCourts } = useQuery(
    {
      queryKey: ["paginationActiveCourts", currentPage, currentLimit],
      queryFn: async () => {
        const res = await courtServices.getAllActiveCourts(
          currentPage,
          currentLimit
        );
        if (res.status !== 200) return [];
        return res.data;
      },
    }
  );

  const activeCourts: Court[] = activeCourtsResponse?.activeCourts || [];
  const total = activeCourtsResponse?.total ?? 0;

  return (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-8 sm:py-12 lg:py-16 gap-4 sm:gap-6 lg:gap-8">
      <h1 className="text-3xl font-bold max-w-md text-center">
        Jelajahi & Pesan Lapangan Badminton di Sekitar Anda
      </h1>
      <p className="text-lg max-w-4xl text-center">
        Temukan lapangan ideal yang sesuai dengan jadwal, lokasi, dan preferensi
        pribadi Anda. Setiap lapangan dijaga dengan standar profesional yang
        tinggi untuk kenyamanan dan ketenangan pikiran Anda.
      </p>
      <div className="w-full grid grid-cols-3 gap-4">
        {activeCourts &&
          activeCourts.map((court) => (
            <CourtCard
              id={court.id}
              key={court.id}
              title={court.name}
              price={court.pricePerHour}
              img={court.image || ""}
            />
          ))}
      </div>
      <PaginationData total={total} refetch={refetchActiveCourts} />
    </div>
  );
};

export default CourtSection;
