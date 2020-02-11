export default class PagedRequestData {
  constructor(properties) {
    this.offset = properties.offset || 1;
    this.pageNumber = properties.pageNumber || 0;
    this.page = this.pageNumber;
    this.pageSize = properties.pageSize || 10;
    this.size = this.pageSize;
    this.paged = true;
    this["sort.sorted"] = true;
    this["sort.unsorted"] = false;
    this.unpaged = false;
    this.sortBy = properties.sortBy || "";
    this.sortDesc = properties.sortDesc || false;
    this.sort = this.generateSort();
  }

  set setPageNumber(value) {
    this.page = value - 1;
    this.pageNumber = this.page;
  }

  set setSortBy(property) {
    this.sortBy = property;
    this.sort = this.generateSort();
  }

  set setSortDesc(desc) {
    this.sortDesc = desc;
    this.sort = this.generateSort();
  }

  generateSort() {
    return `${this.sortBy}${this.sortDesc ? ",desc" : ""}`;
  }
}
