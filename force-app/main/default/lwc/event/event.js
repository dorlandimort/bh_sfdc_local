/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for BatchJobRecordEvent resource of the API
 */
export default class Event {
  /**
   * Types for Event
   *  @enum { string }
   */
  static TYPES = ["RECEIVED", "REPROCESSED", "GAVEUP"];

  /**
   * Class constructor
   * @param properties: The raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    this.id = properties["id"];
    this.timestamp = properties["timestamp"];
    this.type = properties["type"];
    this.batchJobRecordId = properties["batchJobRecordId"];
  }
}
