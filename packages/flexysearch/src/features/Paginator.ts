import { IPaginator } from '..';

class Paginator implements IPaginator {
  perPage = 10;
  currentPage = 1;
  total = 0;

  constructor(data: Partial<IPaginator>) {
    Object.assign(this, data);
  }

  get firstPage() {
    return 1;
  }

  get isEmpty() {
    return this.total === 0;
  }

  get hasTotal() {
    return this.total > 0;
  }

  get hasMorePages() {
    return this.currentPage < this.lastPage;
  }

  get hasPages() {
    return this.total > this.perPage;
  }

  get lastPage() {
    return Math.ceil(this.total / this.perPage);
  }
}

class Paginate<T = unknown> {
  data: T[];
  meta: IPaginator;

  constructor(data: T[], limit: number) {
    this.data = data;
    this.meta = new Paginator({ perPage: limit, total: data.length });
  }

  page(page: number) {
    this.meta.currentPage = page;
    return this;
  }

  get all() {
    return {
      data: this.data.slice(0, this.meta.perPage),
      meta: this.meta,
    };
  }
}

export default Paginate;
