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

  compareWith(valueToBeCompared: string) {
    switch (this.role) {
      case RuleStringOptions.equals:
        return String(valueToBeCompared) === this.term;
      case RuleStringOptions.contains:
        return (
          (String(valueToBeCompared).match(this.getRegexValue(String(this.term))) || []).length > 0
        );
      default:
        throw new Error('[flexysearch]: Invalid role in String');
    }
  }
}
