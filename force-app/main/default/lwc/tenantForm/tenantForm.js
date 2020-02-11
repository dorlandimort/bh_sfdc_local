import { LightningElement, api } from "lwc";
import Tenant from "c/tenant";

export default class TenantForm extends LightningElement {
  @api currentTenant;

  closeModal() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  getTenant() {
    const name = this.template.querySelector(".name");
    const description = this.template.querySelector(".description");
    const tenant = new Tenant({
        name: name.value,
        description: description.value
      });
    return tenant;
  }

  saveMethod() {
    const tenant = this.getTenant();

    const event = new CustomEvent("save", { detail: tenant });
    this.dispatchEvent(event);
  }
}
