import instance from "@/lib/axios/instance";
import {
  CashlessPaymentPayload,
  TransferPaymentPayload,
} from "@/types/payment";

export const paymentServices = {
  createCashlessPayment: async (payload: CashlessPaymentPayload) => {
    return instance.post("/payment/cashless", payload, {
      validateStatus: () => true,
    });
  },
  createTransferPayment: async (payload: TransferPaymentPayload) => {
    return instance.post("/payment/transfer", payload, {
      validateStatus: () => true,
    });
  },
};
