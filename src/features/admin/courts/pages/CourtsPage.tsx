"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import DialogCreateCourt from "../components/DialogCreateCourt";
import { useEffect, useState } from "react";
import courtServices from "../services/court";
import { Court } from "@/generated/prisma/client";

const CourtsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    const fetchCourts = async () => {
      const res = await courtServices.getAllCourts();
      setCourts(res.data.data);
    };
    fetchCourts();
  }, []);

  console.log(courts);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Lapangan</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sky-700 hover:bg-sky-700/80 flex items-center gap-2">
              <PlusCircleIcon className="size-4" /> Tambah Lapangan
            </Button>
          </DialogTrigger>
          <DialogCreateCourt setIsOpen={setIsOpen} />
        </Dialog>
      </div>
    </div>
  );
};

export default CourtsPage;
