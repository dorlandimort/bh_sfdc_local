import { LightningElement, api, track } from "lwc";
import channelsRepository from "c/channelsRepository";
import Definition from "c/definition";
import tenantsRepository from "c/tenantsRepository";

export default class DefinitionsForm extends LightningElement {
  @api currentDefinition;
  @api isEdit;
  @track title;
  @track value = "inProgress";
  @track sourceType = "inProgress";
  @track destinationType = "inProgress";
  @track tenants = [];
  @track types = [];

  async connectedCallback() {
    await this.fetchData();
  }

  async fetchData() {
    this.title = this.isEdit ? "Edit Batch Job" : "Create Batch Job";

    if (this.currentDefinition) {
      this.value = this.currentDefinition.tenantId;
      this.sourceType = this.currentDefinition.sourceType;
      this.destinationType = this.currentDefinition.destinationType;
    }

    let options = await tenantsRepository.get();
    this.tenants = options.map(tenant => {
      return { label: tenant.name, value: tenant.id.toString() };
    });

    let types = await channelsRepository.getTypes();
    this.types = types.map(type => {
      return { label: type, value: type };
    });
  }

  close() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  getBatchJobDefinition() {
    const name = this.template.querySelector(".name");
    const description = this.template.querySelector(".description");
    const sleepInterval = this.template.querySelector(".sleepInterval");
    const ttl = this.template.querySelector(".ttl");
    const sourceAddress = this.template.querySelector(".sourceAddress");
    const destinationAddress = this.template.querySelector(
      ".destinationAddress"
    );

    const definition = new Definition({
      name: name.value,
      description: description.value,
      tenantId: this.value,
      sleepInterval: sleepInterval.value,
      ttl: ttl.value,
      sourceType: this.sourceType,
      sourceAddress: sourceAddress.value,
      destinationType: this.destinationType,
      destinationAddress: destinationAddress.value
    });
    return definition;
  }

  save() {
    const definition = this.getBatchJobDefinition();

    const event = new CustomEvent("save", { detail: definition });
    this.dispatchEvent(event);
  }

  handleChange(event) {
    // gets the value (or id)
    this.value = event.detail.value;
  }

  handleSourceType(event) {
    this.sourceType = event.detail.value;
  }

  handleDestinationType(event) {
    this.destinationType = event.detail.value;
  }
}
