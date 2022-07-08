'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.RuleStringOptions = void 0;
(function (RuleStringOptions) {
  RuleStringOptions['contains'] = 'contains';
  RuleStringOptions['equals'] = 'equals';
})(exports.RuleStringOptions || (exports.RuleStringOptions = {}));
exports.RuleNumberOptions = void 0;
(function (RuleNumberOptions) {
  RuleNumberOptions['contains'] = 'contains';
  RuleNumberOptions['equals'] = 'equals';
})(exports.RuleNumberOptions || (exports.RuleNumberOptions = {}));
exports.RuleOperator = void 0;
(function (RuleOperator) {
  RuleOperator['AND'] = '@and';
  RuleOperator['OR'] = '@or';
})(exports.RuleOperator || (exports.RuleOperator = {}));

var NumberProcessor = /** @class */ (function () {
  function NumberProcessor(value, role) {
    this.term = '';
    this.term = String(value);
    this.role = role;
  }
  NumberProcessor.prototype.getRegexValue = function (value) {
    return new RegExp(value, 'gi');
  };
  NumberProcessor.prototype.compareWith = function (valueToBeCompared) {
    switch (this.role) {
      case exports.RuleNumberOptions.equals:
        return Number(valueToBeCompared) === Number(this.term);
      case exports.RuleNumberOptions.contains:
        return (
          (String(valueToBeCompared).match(this.getRegexValue(String(this.term))) || []).length > 0
        );
      default:
        throw new Error('[flexysearch]: Invalid role in String');
    }
  };
  return NumberProcessor;
})();

var StringProcessor = /** @class */ (function () {
  function StringProcessor(value, role) {
    this.term = '';
    this.term = value;
    this.role = role;
  }
  StringProcessor.prototype.getRegexValue = function (value) {
    return new RegExp(value, 'gi');
  };
  StringProcessor.prototype.compareWith = function (valueToBeCompared) {
    switch (this.role) {
      case exports.RuleStringOptions.equals:
        return String(valueToBeCompared) === this.term;
      case exports.RuleStringOptions.contains:
        return (
          (String(valueToBeCompared).match(this.getRegexValue(String(this.term))) || []).length > 0
        );
      default:
        throw new Error('[flexysearch]: Invalid role in String');
    }
  };
  return StringProcessor;
})();

var SearchEngine = /** @class */ (function () {
  function SearchEngine(collection) {
    this.shouldHave = [];
    this.mustHave = [];
    this.initialData = [];
    this.initialData = collection;
    this.mustHave = collection;
  }
  SearchEngine.prototype.search = function (queries) {
    var query = {
      '@or': queries.filter(function (item) {
        return item.operator === exports.RuleOperator.OR;
      }),
      '@and': queries.filter(function (item) {
        return item.operator === exports.RuleOperator.AND;
      })
    };
    this.processShouldArraySearch(query[exports.RuleOperator.OR]);
    this.processMustArraySearch(query[exports.RuleOperator.AND]);
    return this.all;
  };
  SearchEngine.prototype.processShouldArraySearch = function (queryArray) {
    var _this = this;
    this.shouldHave = this.initialData.filter(function (data) {
      return _this.filterData(data, queryArray);
    });
  };
  SearchEngine.prototype.processMustArraySearch = function (queryArray) {
    var _this = this;
    this.mustHave = this.mustHave.filter(function (data) {
      return _this.filterMustArrayData(data, queryArray);
    });
  };
  SearchEngine.prototype.filterData = function (data, queryArray) {
    var _this = this;
    return queryArray.some(function (queryCurrent) {
      return _this.someDataIsValid(queryCurrent, data);
    });
  };
  SearchEngine.prototype.filterMustArrayData = function (data, queryArray) {
    var _this = this;
    var checkedsRoles = queryArray.map(function (queryCurrent) {
      return _this.someDataIsValid(queryCurrent, data);
    });
    return !checkedsRoles.some(function (item) {
      return item === false;
    });
  };
  SearchEngine.prototype.someDataIsValid = function (queryCurrent, data) {
    switch (queryCurrent.type) {
      case 'string':
        return new StringProcessor(queryCurrent.term, queryCurrent.role).compareWith(
          data[queryCurrent.field]
        );
      case 'number':
        return new NumberProcessor(queryCurrent.term, queryCurrent.role).compareWith(
          data[queryCurrent.field]
        );
      default:
        throw new Error('Processor not found');
    }
  };
  Object.defineProperty(SearchEngine.prototype, 'all', {
    get: function () {
      return this.mustHave.concat(this.shouldHave);
    },
    enumerable: false,
    configurable: true
  });
  return SearchEngine;
})();

exports['default'] = SearchEngine;
//# sourceMappingURL=index.js.map
