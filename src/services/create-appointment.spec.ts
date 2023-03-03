import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment'
import { CreateAppointment } from './create-appointment'

describe('Create Appointment', () => {
  it('should be able to create a new appointment', () => {
    const createAppointment = new CreateAppointment()

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: new Date().getHours(),
        endsAt: new Date().getHours() + 1,
      }),
    ).resolves.toBeInstanceOf(Appointment)
  })
})
