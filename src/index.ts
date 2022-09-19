import { StringProcessor } from './utils/strings'
import { IRule, RuleOperator } from '../interfaces'
import { NumberProcessor } from './utils/number'
import { hashCode } from './utils/hash'
import { DateProcessor } from './utils/dates'
class SearchEngine {
  private shouldHave: any[] = []
  private mustHave: any[] = []
  private initialData: any[] = []

  constructor(collection: any[]) {
    const collectionToBeStored = collection.map((item) => ({
      fs_uuid: hashCode(JSON.stringify(item)),
      ...item,
    }))
    this.initialData = collectionToBeStored
    this.mustHave = collectionToBeStored
  }

  search(queries: IRule[]) {
    const query = {
      '@or': queries.filter((item) => item.operator === RuleOperator.OR),
      '@and': queries.filter((item) => item.operator === RuleOperator.AND),
    }

    this.processShouldArraySearch(query[RuleOperator.OR])
    this.processMustArraySearch(query[RuleOperator.AND])

    return this.all
  }

  private processShouldArraySearch(queryArray: IRule[]) {
    this.shouldHave = this.initialData.filter((data) => this.filterData(data, queryArray))
  }

  private processMustArraySearch(queryArray: IRule[]) {
    this.mustHave = this.mustHave.filter((data) => this.filterMustArrayData(data, queryArray))
  }

  private filterData(data: Record<string, string>, queryArray: IRule[]) {
    return queryArray.some((queryCurrent) => {
      return this.someDataIsValid(queryCurrent, data)
    })
  }

  private filterMustArrayData(data: Record<string, string>, queryArray: IRule[]) {
    const checkedsRoles = queryArray.map((queryCurrent) => {
      return this.someDataIsValid(queryCurrent, data)
    })
    return !checkedsRoles.some((item) => item === false)
  }

  private someDataIsValid(queryCurrent: IRule, data: Record<string, string>) {
    switch (queryCurrent.type) {
      case 'string':
        return new StringProcessor(queryCurrent?.term || null, queryCurrent.role).compareWith(
          data[queryCurrent.field],
          queryCurrent.caseSensitive || false,
        )
      case 'number':
        return new NumberProcessor(queryCurrent?.term || null, queryCurrent.role).compareWith(
          data[queryCurrent.field],
        )
      case 'date':
        return new DateProcessor(queryCurrent?.term || null, queryCurrent.role).compareWith(
          data[queryCurrent.field],
        )
      default:
        throw new Error('[flexysearch]: Processor not found')
    }
  }

  get all() {
    const data = this.mustHave.concat(this.shouldHave)
    return (
      data
        .filter((char, index) => {
          return data.indexOf(char) === index
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ fs_uuid, ...rest }) => rest)
    )
  }
}

export default SearchEngine
export * from '../interfaces'
