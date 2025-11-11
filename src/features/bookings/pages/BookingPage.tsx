"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "../components/BookingForm";
import { useBookingPage } from "../hooks/useBookingPage";

const BookingPage = () => {
  const {
    openTime,
    closedTime,
    isClosed,
    bookedTimes,
    availableTimes,
    date,
    setOpenTime,
    setClosedTime,
    setIsClosed,
    setBookedTimes,
    setAvailableTimes,
    setDate,
  } = useBookingPage();
  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto min-h-screen flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col gap-2 lg:gap-4">
        <h1 className="text-center text-4xl font-bold text-sky-700">
          Booking Lapangan
        </h1>
        <p className="max-w-3xl text-center">
          Booking lapangan sekarang, main kapan saja, dan rasakan keseruan tanpa
          batas!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <BookingForm
          setOpenTime={setOpenTime}
          setClosedTime={setClosedTime}
          setIsClosed={setIsClosed}
          setBookedTimes={setBookedTimes}
          setAvailableTimes={setAvailableTimes}
          setDate={setDate}
        />
        <Card>
          <CardHeader>
            <CardTitle>
              Jadwal Lapangan {date !== "" ? `Hari ${date}` : ""}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isClosed ? (
              <Badge variant="destructive" className="px-3 py-2">
                Sedang Tutup
              </Badge>
            ) : (
              <>
                {openTime && closedTime ? (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="font-semibold">Jam Operasional</h2>
                      <Badge className="bg-sky-200 text-sky-700">{`${openTime} - ${closedTime}`}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="font-semibold">Waktu Terbooking:</h2>
                      {bookedTimes.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                          {bookedTimes.map((time, index) => (
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
                        {availableTimes.map((time, index) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
