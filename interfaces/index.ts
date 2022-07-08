export type StringOperators = 'is';
export type NumberOperators = 'is';

export type IRuleType = 'string' | 'number';

export enum RuleStringOptions {
  contains = 'contains',
  equals = 'equals'
}

export enum RuleNumberOptions {
  contains = 'contains',
  equals = 'equals'
}

export enum RuleOperator {
  AND = '@and',
  OR = '@or'
}

export type IRoles = RuleStringOptions | RuleNumberOptions;
export interface IRule {
  field: string;
  term: any;
  role: IRoles;
  type: IRuleType;
  operator: RuleOperator;
}
