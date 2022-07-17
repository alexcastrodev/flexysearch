import { IRoles, RuleStringOptions } from '../../interfaces';

export class StringProcessor {
  private term = '';
  private role: IRoles;

  constructor(value: string, role: IRoles) {
    this.term = value;
    this.role = role as RuleStringOptions;
  }

  private getRegexValue(value: string) {
    return new RegExp(value, 'gi');
  }

  private checkContains(valueToBeCompared: string) {
    const regexpMatches = (
      String(valueToBeCompared).match(this.getRegexValue(String(this.term))) || []
    ).length;

    if (this.role === RuleStringOptions.notContains) {
      return regexpMatches === 0;
    }

    return regexpMatches > 0;
  }

  compareWith(valueToBeCompared: string) {
    switch (this.role) {
      case RuleStringOptions.equals:
        return String(valueToBeCompared) === this.term;
      case RuleStringOptions.contains:
      case RuleStringOptions.notContains:
        return this.checkContains(valueToBeCompared);
      default:
        throw new Error('[flexysearch]: Invalid role in String');
    }
  }
}
