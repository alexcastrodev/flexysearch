import { IRoles, RuleStringOptions } from '../../interfaces';

export class StringProcessor {
  private term = '';
  private caseSentive = false;
  private role: IRoles;

  constructor(value: string, role: IRoles) {
    this.term = value;
    this.role = role as RuleStringOptions;
  }

  private getRegexValue(value: string) {
    const flags = this.caseSentive ? 'g' : 'gi';
    return new RegExp(value, flags);
  }

  private checkContains(valueToBeCompared: string) {
    const term = this.getRegexValue(String(this.term));

    const regexpMatches = (valueToBeCompared.match(term) || []).length;

    if (this.role === RuleStringOptions.notContains) {
      return regexpMatches === 0;
    }

    return regexpMatches > 0;
  }

  private checkEquals(valueToBeCompared: string) {
    const term = this.getRegexValue(String(this.term));
    console.log('🚀 ~ file: strings.ts ~ line 32 ~ StringProcessor ~ checkEquals ~ term', term);
    const regexpMatches = (valueToBeCompared.match(term) || []).length;

    return regexpMatches > 0;
  }

  compareWith(valueToBeCompared: string, caseSentive: boolean) {
    this.caseSentive = caseSentive;

    switch (this.role) {
      case RuleStringOptions.equals:
        return this.checkEquals(String(valueToBeCompared));
      case RuleStringOptions.contains:
      case RuleStringOptions.notContains:
        return this.checkContains(String(valueToBeCompared));
      default:
        throw new Error('[flexysearch]: Invalid role in String');
    }
  }
}
