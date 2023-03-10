import { Appointment } from '../../entities/appointment'
import { AppointmentRepository } from './appointments-repository'

import { areIntervalsOverlapping } from 'date-fns'

export class InMemmoryAppointmentRepository implements AppointmentRepository {
  private items: Appointment[] = []

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null> {
    const overlappingAppointments = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true },
      )
    })

    if (!overlappingAppointments) {
      return null
    }

    return overlappingAppointments
  }
}
