import {
  CalendarCheckIcon,
  ChartNoAxesCombined,
  Clock10Icon,
  DollarSignIcon,
  LandmarkIcon,
  LayoutDashboard,
  Users2Icon,
} from "lucide-react";

export const SIDEBAR_MENU_LIST = [
  {
    items: [
      {
        name: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        name: "Lapangan",
        url: "/admin/courts",
        icon: LayoutDashboard,
      },
      {
        name: "Bookings",
        url: "/admin/bookings",
        icon: CalendarCheckIcon,
      },
      {
        name: "Payments",
        url: "/admin/payments",
        icon: DollarSignIcon,
      },
      {
        name: "Banks",
        url: "/admin/banks",
        icon: LandmarkIcon,
      },
      {
        name: "Schedules",
        url: "/admin/schedules",
        icon: Clock10Icon,
      },
      {
        name: "Users",
        url: "/admin/users",
        icon: Users2Icon,
      },
      {
        name: "Reports",
        url: "/admin/reports",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];
