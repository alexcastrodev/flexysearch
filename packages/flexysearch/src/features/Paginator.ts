import { off } from 'process';
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

  get offset() {
    return this.perPage * (this.currentPage - 1);
  }
}

class Paginate<T = unknown> {
  data: T[];
  meta: Paginator;

  constructor(data: T[], limit: number) {
    this.data = data;
    this.meta = new Paginator({ perPage: limit, total: data.length });
  }

  page(page: number) {
    this.meta.currentPage = page;
    return this;
  }

  get metaObject(): IPaginator {
    return {
      perPage: this.meta.perPage,
      currentPage: this.meta.currentPage,
      total: this.meta.total,
      firstPage: this.meta.firstPage,
      isEmpty: this.meta.isEmpty,
      hasTotal: this.meta.hasTotal,
      hasMorePages: this.meta.hasMorePages,
      hasPages: this.meta.hasPages,
      lastPage: this.meta.lastPage,
      offset: this.meta.offset,
    };
  }

  get all() {
    return {
      data: this.data.slice(this.meta.offset, this.meta.perPage),
      meta: this.metaObject,
    };
  }
}

export default Paginate;
