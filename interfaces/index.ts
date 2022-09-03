export type StringOperators = 'is';
export type NumberOperators = 'is';

export type IRuleType = 'string' | 'number';

export enum RuleStringOptions {
  contains = 'contains',
  notContains = 'not_contains',
  equals = 'equals',
  isEmpty = 'is_empty',
  isNotEmpty = 'is_not_empty'
}

export enum RuleNumberOptions {
  contains = 'contains',
  notContains = 'not_contains',
  equals = 'equals',
  isEmpty = 'is_empty',
  isNotEmpty = 'is_not_empty'
}

export enum RuleOperator {
  AND = '@and',
  OR = '@or'
}

export type IRoles = RuleStringOptions | RuleNumberOptions;
export interface IRule {
  field: string;
  term?: any;
  role: IRoles;
  type: IRuleType;
  operator: RuleOperator;
  caseSensitive?: boolean;
}
