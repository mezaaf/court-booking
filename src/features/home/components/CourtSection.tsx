"use client";
import { useQuery } from "@tanstack/react-query";
import CourtCard from "./CourtCard";
import courtServices from "@/features/admin/courts/services/court";
import { Court } from "@/generated/prisma/client";

const CourtSection = () => {
  const { data: activeCourts } = useQuery({
    queryKey: ["ActiveCourts"],
    queryFn: async () => {
      const res = await courtServices.getAllActiveCourts();
      if (res.data.status === 200) return res.data.data as Court[];
    },
  });

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
    </div>
  );
};

export default CourtSection;
