export type IRuleType = 'string' | 'number' | 'date' | 'custom'

export enum RuleStringOptions {
  contains = 'contains',
  notContains = 'not_contains',
  equals = 'equals',
  isEmpty = 'is_empty',
  isNotEmpty = 'is_not_empty',
}

export enum RuleNumberOptions {
  contains = 'contains',
  notContains = 'not_contains',
  equals = 'equals',
  isEmpty = 'is_empty',
  isNotEmpty = 'is_not_empty',
}

export enum RuleDateOptions {
  equals = 'equals',
  isNotEquals = 'is_not_equals',
  isAfter = 'after',
  isBefore = 'before',
  isBetween = 'is_between',
  empty = 'is_empty',
  isNotEmpty = 'is_not_empty',
}

export enum RuleOperator {
  AND = '@and',
  OR = '@or',
}

export type IRoles = RuleStringOptions | RuleNumberOptions | RuleDateOptions

export type IRuleFilter<T = any> = (datum: T) => boolean

export interface IRule {
  type: IRuleType
  operator: RuleOperator
  field?: string
  term?: any
  role?: IRoles
  caseSensitive?: boolean
  filter?: IRuleFilter
}
