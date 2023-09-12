export type IRuleType = 'string' | 'number' | 'date' | 'custom'

export enum RuleStringOptions {
  contains = 'contains',
  notContains = 'not_contains',
  equals = 'equals',
  isEmpty = 'is_empty',
  isNotEmpty = 'is_not_empty',
  startsWith = 'starts_with',
  endsWith = 'ends_with',
}

export enum RuleNumberOptions {
  contains = 'contains',
  notContains = 'not_contains',
  equals = 'equals',
  isEmpty = 'is_empty',
  isNotEmpty = 'is_not_empty',
  isNotEquals = 'is_not_equals',
  biggerThan = 'bigger_than',
  smallerThan = 'smaller_than',
  biggerOrEquals = 'bigger_or_equals',
  smallerOrEquals = 'smaller_or_equals',
}

export enum RuleDateOptions {
  equals = 'equals',
  isNotEquals = 'is_not_equals',
  isAfter = 'after',
  isBefore = 'before',
  isOnOrAfter = 'on_or_after',
  isOnOrBefore = 'on_or_before',
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

export interface IPaginator {
  perPage: number
  currentPage: number
  firstPage: number
  isEmpty: boolean
  total: number
  hasTotal: boolean
  lastPage: number
  hasMorePages: boolean
  hasPages: boolean
  offset: number
}

export interface IPaginateResult<T = unknown> {
  data: T[]
  meta: IPaginator
}
