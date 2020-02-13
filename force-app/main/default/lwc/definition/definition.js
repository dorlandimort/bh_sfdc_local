/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for BatchJobRecordDefinition resource of the API
 */
// const uuidv1 = require("uuid/v1");
// import generator from '@salesforce/apex/UUIDService.generator';

export default class Definition  {
  /**
   * Class constructor
   * @param properties: The raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    // loadScript(this, 'uuid');
    this.id = this.id || properties["id"];
    this.name = this.name || properties["name"];
    this.description = this.destination || properties["description"];
    //this.source = new Channel(properties['source'] || {});
    //this.destination = new Channel(properties['destination'] || {});
    this.ttl = this.ttl ||properties["ttl"];
    this.sleepInterval = this.sleepInterval ||properties["sleepInterval"];

    this.sourceAddress = this.sourceAddress || properties["sourceAddress"];
    this.sourceType = this.sourceType || properties["sourceType"];
    this.destinationAddress = this.destinationAddress || properties["destinationAddress"];
    this.destinationType = this.destinationType || properties["destinationType"];
    this.tenantId = this.tenantId || properties["tenantId"];
    // this.uuid = properties["uuid"] || generator(32); //uuidv1();
    this.formattedDestinationAddress = this.formattedDestinationAddress ||
      properties["formattedDestinationAddress"];
    this.formattedSourceAddress = this.formattedSourceAddress || properties["formattedSourceAddress"];
  }

  asJSON(){
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ttl: this.ttl,
      sleepInterval: this.sleepInterval,
      sourceAddress: this.sourceAddress,
      sourceType: this.sourceType,
      destinationAddress: this.destinationAddress,
      destinationType: this.destinationType,
      tenantId: this.tenantId,
      uuid: this.uuid,
      formattedDestinationAddress: this.formattedDestinationAddress,
      formattedSourceAddress: this.formattedSourceAddress
    }
  }
}
