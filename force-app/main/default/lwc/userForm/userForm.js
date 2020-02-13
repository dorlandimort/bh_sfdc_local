import { LightningElement, api, track } from "lwc";
import User from "c/user";
import tenantsRepository from "c/tenantsRepository";

export default class UserForm extends LightningElement {
  @api currentUser;
  @api isEdit;
  @track title;
  @track value = "inProgress";
  @track options = [];


  async connectedCallback() {
    await this.fetchData();
  }

  async fetchData() {
    this.title = this.isEdit ? "Edit user" : "Create user";
    // get tenants
    let tenants = await tenantsRepository.get();
    this.options = tenants.map(tenant => {
      return {label: tenant.name, value: tenant.id.toString()}
    });
  }

  close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  getUser() {
    const displayName = this.template.querySelector(".displayName");
    const emailAddress = this.template.querySelector(".emailAddress");
    const username = this.template.querySelector(".username");
    const password = this.template.querySelector(".password");

    const user = new User({
      displayName: displayName.value,
      emailAddress: emailAddress.value,
      username: username.value,
      password: password.value,
      tenantId: this.value,
    
    });
    return user;
  }

  save() {
    const user = this.getUser();

    const event = new CustomEvent("save", { detail: user });
    this.dispatchEvent(event);
  }

  handleChange(event) {
    // gets the value (or id)
    this.value = event.detail.value;
  }
}
