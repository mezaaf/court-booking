export type CashlessPaymentPayload = {
  bookingId: string;
};

export type TransferPaymentPayload = CashlessPaymentPayload & {
  bankAccountId: string;
  proofOfPayment: string;
};
