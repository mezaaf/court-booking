"use client";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Court } from "@/generated/prisma/client";
import useDataTable from "@/hooks/useDataTable";
import { convertIDR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import DialogCreateCourt from "../components/DialogCreateCourt";
import { COURT_TABLE_HEADER } from "../constant/courtConstant";
import courtServices from "../services/court";

const CourtsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useDataTable();

  const {
    data: courtsResponse,
    isLoading,
    refetch: refetchCourts,
  } = useQuery({
    queryKey: ["courts", currentSearch, currentPage, currentLimit],
    queryFn: async () => {
      const res = await courtServices.getAllCourts(
        currentSearch,
        currentPage,
        currentLimit
      );
      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
      return res;
    },
  });

  const courts = courtsResponse?.data.data as Court[];
  const total = courtsResponse?.data.total as number;

  const filteredData = useMemo(() => {
    return (courts || []).map((court, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        court.name,
        court.description || "-",
        convertIDR(court.pricePerHour),
        court.isActive ? "Aktif" : "Tidak Aktif",
      ];
    });
  }, [courts, currentLimit, currentPage]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Lapangan ({total})</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Cari nama / deskripsi..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-sky-700 hover:bg-sky-700/80 flex items-center gap-2">
                <PlusCircleIcon className="size-4" /> Tambah Lapangan
              </Button>
            </DialogTrigger>
            <DialogCreateCourt
              setIsOpen={setIsOpen}
              refetchCourts={refetchCourts}
            />
          </Dialog>
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
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
