import { ObjectContaining } from '@vitest/expect'
import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {
  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt: new Date().getHours(),
    endsAt: new Date().getHours() + 1,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment).toEqual(
    new ObjectContaining({
      props: {
        customer: 'John Doe',
        startsAt: new Date().getHours(),
        endsAt: new Date().getHours() + 1,
      },
    }),
  )
})
