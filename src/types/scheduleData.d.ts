export type ScheduleData = {
  times: string[];
  bookedTimes: { startTime: string; endTime: string }[];
  startTimes: string[];
  endTimes: string[];
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  pricePerHour: number;
};
