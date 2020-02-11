/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for BatchJobRecordDefinition resource of the API
 */
const uuidv1 = require("uuid/v1");

export default class Definition {
  /**
   * Class constructor
   * @param properties: The raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    this.id = properties["id"];
    this.name = properties["name"];
    this.description = properties["description"];
    //this.source = new Channel(properties['source'] || {});
    //this.destination = new Channel(properties['destination'] || {});
    this.ttl = properties["ttl"];
    this.sleepInterval = properties["sleepInterval"];

    this.sourceAddress = properties["sourceAddress"];
    this.sourceType = properties["sourceType"];
    this.destinationAddress = properties["destinationAddress"];
    this.destinationType = properties["destinationType"];
    this.tenantId = properties["tenantId"];
    this.uuid = properties["uuid"] || uuidv1();
    this.formattedDestinationAddress =
      properties["formattedDestinationAddress"];
    this.formattedSourceAddress = properties["formattedSourceAddress"];
  }
}
