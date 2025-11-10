"use client";
import DataTable from "@/components/common/DataTable";
import { Input } from "@/components/ui/input";
import { convertIDR } from "@/lib/utils";
import Image from "next/image";
import { useMemo } from "react";
import DialogCourt from "../components/DialogCourt";
import DialogDeleteCourt from "../components/DialogDeleteCourt";
import { COURT_TABLE_HEADER } from "../constant/courtConstant";
import { useCourtPage } from "../hooks/useCourtPage";

const CourtsPage = () => {
  const {
    courts,
    total,
    isLoading,
    refetchCourts,
    currentPage,
    currentLimit,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useCourtPage();
  const filteredData = useMemo(() => {
    return (courts || []).map((court, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        <div className="flex items-center gap-2" key={court.id}>
          <Image
            src={court.image as string}
            alt={court.name}
            width={40}
            height={40}
            className="rounded aspect-video w-12 object-cover object-center"
          />
          {court.name}
        </div>,
        court.description || "-",
        convertIDR(court.pricePerHour),
        court.isActive ? "Aktif" : "Tidak Aktif",
        <div key={court.id} className="flex items-center gap-2">
          <DialogCourt
            mode="update"
            refetchCourts={refetchCourts}
            courtId={court.id}
            initialValues={{
              name: court.name,
              description: court.description || undefined,
              pricePerHour: court.pricePerHour.toString(),
              image: court.image as string,
              isActive: court.isActive,
            }}
          />

          <DialogDeleteCourt
            courtId={court.id}
            courtName={court.name}
            refetch={refetchCourts}
          />
        </div>,
      ];
    });
  }, [courts, currentLimit, currentPage, refetchCourts]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Lapangan ({total})</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Cari nama / deskripsi..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <DialogCourt mode="create" refetchCourts={refetchCourts} />
        </div>
      </div>
      <DataTable
        header={COURT_TABLE_HEADER}
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

export default CourtsPage;
