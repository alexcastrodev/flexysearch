import { IRoles, RuleStringOptions } from '../../interfaces'

export class StringProcessor {
  private term = ''
  private caseSensitive = false
  private role: IRoles

  constructor(value: string, role?: IRoles) {
    this.term = value
    this.role = role as RuleStringOptions
  }

  private getRegexValue(value: string) {
    const flags = this.caseSensitive ? 'g' : 'gi'
    return new RegExp(value, flags)
  }

  private checkContains(valueToBeCompared: string) {
    const term = this.getRegexValue(String(this.term))

    const regexpMatches = (valueToBeCompared.match(term) || []).length

    if (this.role === RuleStringOptions.notContains) {
      return regexpMatches === 0
    }

    return regexpMatches > 0
  }

  private checkEquals(valueToBeCompared: string) {
    if (!this.caseSensitive) {
      return valueToBeCompared.toLowerCase() === this.term.toLowerCase()
    }

    return valueToBeCompared === this.term
  }

  private checkisEmpty(valueToBeCompared: string) {
    return !valueToBeCompared
  }

  private startsWithTerm(valueToBeCompared: string) {
    if (!this.caseSensitive) {
      return valueToBeCompared.toLowerCase().startsWith(this.term.toLowerCase())
    }

    return valueToBeCompared.startsWith(this.term)
  }

  private endsWithTerm(valueToBeCompared: string) {
    if (!this.caseSensitive) {
      return valueToBeCompared.toLowerCase().endsWith(this.term.toLowerCase())
    }

    return valueToBeCompared.endsWith(this.term)
  }

  compareWith(valueToBeCompared: string, caseSensitive: boolean) {
    this.caseSensitive = caseSensitive

    if (typeof valueToBeCompared !== 'string') {
      return false
    }

    switch (this.role) {
      case RuleStringOptions.equals:
        return this.checkEquals(valueToBeCompared)
      case RuleStringOptions.contains:
      case RuleStringOptions.notContains:
        return this.checkContains(valueToBeCompared)
      case RuleStringOptions.isEmpty:
        return this.checkisEmpty(valueToBeCompared)
      case RuleStringOptions.isNotEmpty:
        return !this.checkisEmpty(valueToBeCompared)
      case RuleStringOptions.startsWith:
        return this.startsWithTerm(valueToBeCompared)
      case RuleStringOptions.endsWith:
        return this.endsWithTerm(valueToBeCompared)
      default:
        throw new Error('[flexysearch]: Invalid role in String')
    }
  }
}
