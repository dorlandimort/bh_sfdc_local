/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for Tenant resource of the API
 */
export default class Tenant {
  /**
   * Class constructor
   * @param properties: TThe raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    this.id = properties["id"];
    this.name = properties["name"];
    this.description = properties["description"];
  }

  asJSON(){
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    }
  }
}
