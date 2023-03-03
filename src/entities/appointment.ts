export interface AppointmentProps {
  customer: string
  startsAt: number
  endsAt: number
}

export class Appointment {
  private props: AppointmentProps

  get custumer() {
    return this.props.customer
  }

  get startsAt() {
    return this.props.startsAt
  }

  get endsAt() {
    return this.props.endsAt
  }

  constructor(props: AppointmentProps) {
    if (props.endsAt <= props.startsAt) {
      throw new Error('end time minor than start time')
    }

    this.props = props
  }
}
