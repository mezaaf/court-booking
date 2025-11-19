import { Prisma } from "@/generated/prisma/client";

export type CashlessPaymentPayload = {
  bookingId: string;
};

export type TransferPaymentPayload = CashlessPaymentPayload & {
  bankAccountId: string;
  proofOfPayment: string;
};

export type Payment = Prisma.PaymentGetPayload<{
  include: {
    booking: {
      include: {
        user: true;
        court: true;
      };
    };
  };
}>;
