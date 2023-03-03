import { Appointment, AppointmentProps } from '../entities/appointment'

interface CreateAppointmentRequest extends AppointmentProps {}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({
      customer,
      endsAt,
      startsAt,
    })

    return appointment
  }
}
