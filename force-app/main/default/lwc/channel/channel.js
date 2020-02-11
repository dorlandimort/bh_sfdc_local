/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for MassagingChannel resource of the API
 */
export default class Channel {
  /**
   * Types for Channel
   *  @enum { string }
   */
  static TYPES = ["JMS", "KAFKA", "AMPQ"];

  /**
   * Class constructor
   * @param properties: The raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    this.id = properties["id"];
    this.type = properties["type"];
    this.address = properties["address"];
  }
}
