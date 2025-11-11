import { useState } from "react";

export const useBookingPage = () => {
  const [openTime, setOpenTime] = useState<string>("");
  const [closedTime, setClosedTime] = useState<string>("");
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [bookedTimes, setBookedTimes] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");

  return {
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
  };
};
