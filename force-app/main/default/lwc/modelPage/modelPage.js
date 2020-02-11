export default class ModelPage {
  constructor(properties, ModelClass) {
    this.isFirst = properties["isFirst"] || true;
    this.totalRecords = properties["totalRecords"] || 0;
    this.pageNumber = properties["number"] || 1;
    this.isLast = properties["isLast"] || true;
    this.records = properties["records"]
      ? properties["records"].map(record => new ModelClass(record))
      : [];
    this.totalPages = properties["totalPages"] || 1;
    this.hasPrevious = properties["hasPrevious"] || false;
    this.hasNext = properties["hasNext"] | false;
  }
}
