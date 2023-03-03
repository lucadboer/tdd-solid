import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe('Create Appointment', () => {
  it('should be able to create a new appointment', () => {
    const startsAt = getFutureDate('2023-02-10')
    const endsAt = getFutureDate('2023-02-11')

    const createAppointment = new CreateAppointment()

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endsAt,
      }),
    ).resolves.toBeInstanceOf(Appointment)
  })
})
