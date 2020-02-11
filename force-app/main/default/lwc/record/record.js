/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for BatchJobRecord resource of the API
 */

export default class Record {
  /**
   * Class constructor
   * @param properties: The raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    this.id = properties["id"];
    this.name = properties["batchJobDefinitionName"];
    this.batchJobDefinitionName = properties["batchJobDefinitionName"];
    this.payload = properties["payload"];
    this.ttlRetryExhausted = properties["ttlRetryExhausted"];
    this.uuid = properties["uuid"];
    this.currentTtl = properties["currentTtl"];
    this.description = properties["batchJobDefinitionDesc"];
    this.batchJobDefinitionDesc = properties["batchJobDefinitionDesc"];
    this.batchJobDefinitionId = properties["batchJobDefinitionId"];
    this.tenantId = properties["tenantId"];
  }
}
