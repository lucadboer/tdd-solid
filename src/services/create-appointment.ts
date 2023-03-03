/* eslint-disable no-useless-constructor */
import { Appointment, AppointmentProps } from '../entities/appointment'
import { AppointmentRepository } from '../repositories/in-memory/appointments-repository'

interface CreateAppointmentRequest extends AppointmentProps {}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const alreadyExistsAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
      )

    if (alreadyExistsAppointment) {
      throw new Error('Already exists Appointment at this time')
    }

    const appointment = new Appointment({
      customer,
      endsAt,
      startsAt,
    })

    this.appointmentsRepository.create(appointment)

    return appointment
  }
}
