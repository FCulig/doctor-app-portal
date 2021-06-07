import { Payment } from "./payment";
import { User } from "./user";

export interface Appointment {
    id: string,
    doctorId: string,
    doctor?: User,
    patientId: string,
    patient?: User,
    paidInAdvance: boolean,
    price: number,
    details: string,
    diseaseName: string,
    appointmentTime: string,
    createdAt: string,
    updatedAt: string,
    payment?: Payment
}
