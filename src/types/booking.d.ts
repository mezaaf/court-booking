export type Booking = Prisma.BookingGetPayload<{
  include: {
    user: { select: { id: true; name: true; email: true } };
    court: { select: { id: true; name: true } };
  };
}>;
