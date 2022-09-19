import { RuleNumberOptions } from '../../interfaces/index'
import { IRoles } from '../../interfaces'

export class NumberProcessor {
  private term: number
  private role: IRoles

  constructor(value: number, role?: IRoles) {
    this.term = Number(value)
    this.role = role as RuleNumberOptions
  }

  private getRegexValue(value: string) {
    return new RegExp(value, 'gi')
  }

  private checkContains(valueToBeCompared: string) {
    const regexpMatches = (
      String(valueToBeCompared).match(this.getRegexValue(String(this.term))) || []
    ).length

    if (this.role === RuleNumberOptions.notContains) {
      return regexpMatches === 0
    }

    return regexpMatches > 0
  }

  private checkisEmpty(numberValue: number, valueToBeCompared: string) {
    if (!valueToBeCompared || valueToBeCompared === null) {
      return true
    }
    return !Number.isSafeInteger(numberValue)
  }

  compareWith(valueToBeCompared: string) {
    const numberValue = Number(valueToBeCompared)

    switch (this.role) {
      case RuleNumberOptions.equals:
        return numberValue === this.term
      case RuleNumberOptions.contains:
      case RuleNumberOptions.notContains:
        return this.checkContains(valueToBeCompared)
      case RuleNumberOptions.isEmpty:
        return this.checkisEmpty(numberValue, valueToBeCompared)
      case RuleNumberOptions.isNotEmpty:
        return !this.checkisEmpty(numberValue, valueToBeCompared)
      default:
        throw new Error('[flexysearch]: Invalid role in Numbers')
    }
  }
}
