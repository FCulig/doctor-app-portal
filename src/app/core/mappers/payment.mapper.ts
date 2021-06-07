import { Payment } from "../models/payment";

export class PaymentMapper {
    mapResponseToPayment(paymentResponse): Payment {
        return {
            id: paymentResponse.id,
            createdAt: paymentResponse.createdAt,
            updatedAt: paymentResponse.updatedAt,
            isPaid: paymentResponse.isPaid,
            appointmentId: paymentResponse.appointmentId
        };
    }

    mapArrayResponse(paymentResponse): Payment[] {
        let payments = [];

        paymentResponse.forEach(payment => {
            payments.push({
                id: payment.id,
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt,
                isPaid: payment.isPaid,
                appointmentId: payment.appointmentId
            });
        });

        return payments;
    }
}
