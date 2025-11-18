import { Card, CardContent } from "@/components/ui/card";
import HeroBookForm from "./HeroBookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScheduleData } from "@/types/scheduleData";

const HeroSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  return (
    <div className="w-full bg-[url('/images/hero-bg.jpg')] bg-top-center bg-cover bg-no-repeat py-8 sm:py-12 lg:py-16">
      <div className="w-full min-h-[calc(100vh-64px)] max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center gap-4 sm:gap-6 lg:gap-8 pt-16 sm:pt-20 lg:pt-24">
        <h1 className="text-white text-4xl font-semibold md:text-5xl lg:text-6xl max-w-3xl">
          Pesan lapangan bulutangkis Anda dalam hitungan detik
        </h1>
        <p className="text-white max-w-2xl">
          Amankan tempat Anda kapan saja - tingkatkan permainan Anda hari ini
          dengan membuat pilihan yang lebih cerdas, bukan hanya bekerja lebih
          keras!
        </p>
        <Button asChild className="bg-sky-700 hover:bg-sky-700/80 w-fit">
          <Link href="/bookings">Booking Sekarang</Link>
        </Button>
        <Card className="w-full max-w-3xl">
          <CardContent>
            <HeroBookForm
              setDialogOpen={setDialogOpen}
              setScheduleData={setScheduleData}
            />
          </CardContent>
        </Card>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Jadwal Tersedia</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            {scheduleData?.isClosed ? (
              <Badge variant="destructive" className="px-3 py-2">
                Sedang Tutup
              </Badge>
            ) : (
              <>
                {scheduleData?.openTime && scheduleData?.closeTime ? (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="font-semibold">Jam Operasional</h2>
                      <Badge className="bg-sky-200 text-sky-700">{`${scheduleData.openTime} - ${scheduleData.closeTime}`}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="font-semibold">Waktu Terbooking:</h2>
                      {scheduleData.bookedTimes.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                          {scheduleData.bookedTimes.map((time, index) => (
                            <Badge
                              className="bg-red-100 text-red-800"
                              key={index}
                            >
                              {time.startTime} - {time.endTime} WIB
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p>Belum ada waktu terbooking.</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="font-semibold">Waktu Tersedia:</h2>
                      <div className="grid grid-cols-6 gap-2">
                        {scheduleData?.times.map((time, index) => (
                          <Badge
                            className="bg-green-100 text-green-800"
                            key={index}
                          >
                            {time} WIB
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Tidak ada waktu tersedia.</p>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HeroSection;
