import { Appointment } from "../models/appointment";

export class AppointmentMapper {

    mapArrayResponse(appointmentsResponse): Appointment[] {
        let appointments = [];

        appointmentsResponse.forEach(appointment => {
            appointments.push({
                id: appointment.id,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                paidInAdvance: appointment.paidInAdvance,
                price: appointment.price,
                details: appointment.details,
                diseaseName: appointment.diseaseName,
                appointmentTime: appointment.appointmentDateTime,
                createdAt: appointment.createdAt,
                updatedAt: appointment.updatedAt
            });
        });

        return appointments;
    }
}
