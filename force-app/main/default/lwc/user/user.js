/**
 * Author: Giovanni Martinez - 01-28-2020
 * Model class for User resource of the API
 */

export default class User {
  /**
   * Class constructor
   * @param properties: TThe raw object retrieved from API to be mapped to a single POJO
   */
  constructor(properties) {
    this.id = properties["id"];
    this.displayName = properties["displayName"];
    this.emailAddress = properties["emailAddress"];
    this.tenantId = properties["tenantId"];
    this.username = properties["username"];
    this.password = properties["password"];
  }

  asJSON(){
    return {
      id: this.id,
      displayName: this.displayName,
      emailAddress: this.emailAddress,
      tenantId: this.tenantId,
      username: this.username,
      password: this.password
    }
  }
}
