import { RuleNumberOptions } from '../../interfaces/index';
import { IRoles } from '../../interfaces';

export class NumberProcessor {
  private term = '';
  private role: IRoles;

  constructor(value: string, role: IRoles) {
    this.term = String(value);
    this.role = role as RuleNumberOptions;
  }

  private getRegexValue(value: string) {
    return new RegExp(value, 'gi');
  }

  private checkContains(valueToBeCompared: string) {
    const regexpMatches = (
      String(valueToBeCompared).match(this.getRegexValue(String(this.term))) || []
    ).length;

    if (this.role === RuleNumberOptions.notContains) {
      return regexpMatches === 0;
    }

    return regexpMatches > 0;
  }

  compareWith(valueToBeCompared: string) {
    switch (this.role) {
      case RuleNumberOptions.equals:
        return Number(valueToBeCompared) === Number(this.term);
      case RuleNumberOptions.contains:
      case RuleNumberOptions.notContains:
        return this.checkContains(valueToBeCompared);
      default:
        throw new Error('[flexysearch]: Invalid role in Numbers');
    }
  }
}
