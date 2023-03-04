import { InMemmoryAppointmentRepository } from './../repositories/in-memory/in-memory-appointments-repositorie'
import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe('Create Appointment', () => {
  it('should be able to create a new appointment', () => {
    const startsAt = getFutureDate('2023-02-10')
    const endsAt = getFutureDate('2023-02-11')

    const appointmentRepository = new InMemmoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment)
  })

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2023-03-10')
    const endsAt = getFutureDate('2023-03-15')

    const appointmentRepository = new InMemmoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt,
    })

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2023-03-14'),
        endsAt: getFutureDate('2023-03-15'),
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2023-03-08'),
        endsAt: getFutureDate('2023-03-12'),
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2023-03-10'),
        endsAt: getFutureDate('2023-03-15'),
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2023-03-13'),
        endsAt: getFutureDate('2023-03-18'),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
