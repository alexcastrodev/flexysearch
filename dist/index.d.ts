declare type StringOperators = 'is';
declare type NumberOperators = 'is';
declare type IRuleType = 'string' | 'number';
declare enum RuleStringOptions {
  contains = 'contains',
  equals = 'equals'
}
declare enum RuleNumberOptions {
  contains = 'contains',
  equals = 'equals'
}
declare enum RuleOperator {
  AND = '@and',
  OR = '@or'
}
declare type IRoles = RuleStringOptions | RuleNumberOptions;
interface IRule {
  field: string;
  term: any;
  role: IRoles;
  type: IRuleType;
  operator: RuleOperator;
}

declare class SearchEngine {
  private shouldHave;
  private mustHave;
  private initialData;
  constructor(collection: any[]);
  search(queries: IRule[]): any[];
  private processShouldArraySearch;
  private processMustArraySearch;
  private filterData;
  private filterMustArrayData;
  private someDataIsValid;
  get all(): any[];
}

export {
  IRoles,
  IRule,
  IRuleType,
  NumberOperators,
  RuleNumberOptions,
  RuleOperator,
  RuleStringOptions,
  StringOperators,
  SearchEngine as default
};
