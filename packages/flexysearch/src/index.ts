import { StringProcessor } from './utils/strings'
import { IPaginateResult, IRule, RuleOperator } from '../interfaces'
import { NumberProcessor } from './utils/number'
import { hashCode } from './utils/hash'
import { DateProcessor } from './utils/dates'
import { omit } from './utils/helpers/objects'
import Paginate from './features/Paginator'
class SearchEngine {
  private shouldHave: any[] = []
  private mustHave: any[] = []
  private initialData: any[] = []

  constructor(collection: any[]) {
    if (!Array.isArray(collection)) {
      return
    }
    const collectionToBeStored = collection.map((item) => ({
      fs_uuid: hashCode(JSON.stringify(item)),
      ...item,
    }))
    this.initialData = collectionToBeStored
    this.mustHave = collectionToBeStored
  }

  public search(queries: IRule[]) {
    const query = {
      '@or': queries.filter((item) => item.operator === RuleOperator.OR),
      '@and': queries.filter((item) => item.operator === RuleOperator.AND),
    }

    this.processShouldArraySearch(query[RuleOperator.OR])
    this.processMustArraySearch(query[RuleOperator.AND])

    return this.all
  }

  public searchQuery(queries: IRule[]) {
    this.search(queries)
    return this
  }

  private processShouldArraySearch(queryArray: IRule[]) {
    this.shouldHave = this.initialData.filter((data) =>
      this.filterData(data, queryArray)
    )
  }

  private processMustArraySearch(queryArray: IRule[]) {
    this.mustHave = this.mustHave.filter((data) =>
      this.filterMustArrayData(data, queryArray)
    )
  }

  private filterData(data: Record<string, string>, queryArray: IRule[]) {
    return queryArray.some((queryCurrent) => {
      return this.someDataIsValid(queryCurrent, data)
    })
  }

  private filterMustArrayData(
    data: Record<string, string>,
    queryArray: IRule[]
  ) {
    const checkedsRoles = queryArray.map((queryCurrent) => {
      return this.someDataIsValid(queryCurrent, data)
    })
    return !checkedsRoles.some((item) => item === false)
  }

  private someDataIsValid(queryCurrent: IRule, data: Record<string, string>) {
    const field = queryCurrent.field || ''
    switch (queryCurrent.type) {
      case 'string':
        return new StringProcessor(
          queryCurrent?.term || null,
          queryCurrent.role
        ).compareWith(data[field], queryCurrent.caseSensitive || false)
      case 'number':
        return new NumberProcessor(
          queryCurrent?.term || null,
          queryCurrent.role
        ).compareWith(data[field])
      case 'date':
        return new DateProcessor(
          queryCurrent?.term || null,
          queryCurrent.role
        ).compareWith(data[field])
      case 'custom':
        if (queryCurrent.filter && typeof queryCurrent.filter === 'function') {
          const datum = omit(data, ['fs_uuid'])

          return queryCurrent.filter(datum)
        }
        throw new Error('[flexysearch]: Custom filter not valid')
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

  paginate<T = unknown>(page: number, perPage = 10): IPaginateResult<T> {
    try {
      return new Paginate<T>(this.all, perPage).page(page).all
    } catch {
      return new Paginate<T>([], perPage).page(page).all
    }
  }
}

export default SearchEngine
export * from '../interfaces'
