import { RuleDateOptions } from '../../interfaces/index'
import { IRoles } from '../../interfaces'
import { VALIDATE_DATE_REGEXP } from './regexp'

export class DateProcessor {
  private term: string
  private role: IRoles

  constructor(value: string, role: IRoles) {
    this.term = value
    this.role = role as RuleDateOptions
  }

  private checkIsValid(valueToBeCompared: string): boolean {
    return !!String(valueToBeCompared).match(VALIDATE_DATE_REGEXP)
  }

  private checkisEmpty(valueToBeCompared: string) {
    return !this.checkIsValid(valueToBeCompared)
  }

  private checkIsEqualDate(valueToBeCompared: string) {
    if (!this.checkIsValid(valueToBeCompared) || !this.checkIsValid(this.term)) {
      return false
    }

    const date = new Date(valueToBeCompared as string)
    const dateTerm = new Date(this.term)

    const date1 = [date.getDate(), date.getMonth(), date.getFullYear()].join('')
    const date2 = [dateTerm.getDate(), dateTerm.getMonth(), dateTerm.getFullYear()].join('')

    return date1 === date2
  }

  private checkIsNotEqualDate(valueToBeCompared: string) {
    if (!this.checkIsValid(valueToBeCompared) || !this.checkIsValid(this.term)) {
      return true
    }

    const date = new Date(valueToBeCompared as string)
    const dateTerm = new Date(this.term)

    const date1 = [date.getDate(), date.getMonth(), date.getFullYear()].join('')
    const date2 = [dateTerm.getDate(), dateTerm.getMonth(), dateTerm.getFullYear()].join('')

    return date1 !== date2
  }

  private isAfterOrBefore(valueToBeCompared: string, isBefore = false) {
    if (!this.checkIsValid(valueToBeCompared) || !this.checkIsValid(this.term)) {
      return false
    }

    const date = new Date(valueToBeCompared as string).getTime()
    const dateTerm = new Date(this.term).getTime()

    return isBefore ? dateTerm > date : dateTerm < date
  }

  private isBetween(valueToBeCompared: string) {
    if ((this.term || []).length !== 2) {
      return false
    }

    const isInvalidStart = !this.checkIsValid(this.term[0])
    const isInvalidEnd = !this.checkIsValid(this.term[1])

    if (isInvalidStart || isInvalidEnd || !this.checkIsValid(valueToBeCompared)) {
      return false
    }

    const dateStart = new Date(this.term[0]).getTime()
    const dateEnd = new Date(this.term[1]).getTime()
    const dateTerm = new Date(valueToBeCompared).getTime()

    return dateTerm >= dateStart && dateTerm <= dateEnd
  }

  compareWith(valueToBeCompared: string) {
    switch (this.role) {
      case RuleDateOptions.equals:
        return this.checkIsEqualDate(valueToBeCompared)
      case RuleDateOptions.isNotEquals:
        return this.checkIsNotEqualDate(valueToBeCompared)
      case RuleDateOptions.isNotEmpty:
        return !this.checkisEmpty(valueToBeCompared)
      case RuleDateOptions.empty:
        return this.checkisEmpty(valueToBeCompared)
      case RuleDateOptions.isAfter:
        return this.isAfterOrBefore(valueToBeCompared)
      case RuleDateOptions.isBefore:
        return this.isAfterOrBefore(valueToBeCompared, true)
      case RuleDateOptions.isBetween:
        return this.isBetween(valueToBeCompared)
      default:
        throw new Error('[flexysearch]: Invalid role in Dates')
    }
  }
}
