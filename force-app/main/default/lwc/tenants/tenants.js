import { LightningElement, track, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import TenantsRepository from "c/tenantsRepository";
import PagedRequestData from "c/pagedRequestData";

const columns = [
  { label: "Name", fieldName: "name" },
  { label: "Description", fieldName: "description" },
  {
    label: "Edit",
    type: "button",
    initialWidth: 150,
    typeAttributes: {
      label: { fieldName: "actionLabel" },
      title: "Click to Edit",
      name: "edit",
      iconName: "utility:edit",
      disabled: { fieldName: "actionDisabled" },
      class: "btn_next"
    }
  },
  {
    label: "Delete",
    type: "button",
    initialWidth: 150,
    typeAttributes: {
      label: { fieldName: "actionLabel" },
      title: "Click to Delete",
      name: "delete",
      iconName: "utility:delete",
      disabled: { fieldName: "actionDisabled" },
      class: "btn_next"
    }
  }
];

export default class Tenants extends LightningElement {
  @track data = [];
  columns = columns;
  @track openmodel = false;
  @track openconfirmation = false;
  @track value = "initial value";
  @api currentTenant = {
    id: 0,
    name: ""
  };
  @track isEdit = false;
  @track deleteId = 0;
  @track totalElements = 0;
  @track currentPage = 1;
  @track pagedData = new PagedRequestData({
    sortBy: "name",
    pageSize: 5,
    pageNumber: this.currentPage
  });

  async connectedCallback() {
    await this.fetchData();
  }

  async fetchData() {
    try {
      const data = await TenantsRepository.get();
      this.data = data;
      this.handleResponse("success", "FETCH DATA");
    } catch (error) {
      console.log(error);
      this.handleResponse("fail", "FETCH DATA");
    }
  }

  getInitialObject() {
    return {
      id: 0,
      name: ""
    };
  }

  handleRowAction(cmp, event, helper) {
    const action = cmp.detail.action.name;
    const object = cmp.detail.row;
    switch (action) {
      case "edit":
        this.handleEdit(object);
        break;
      case "delete":
        this.deleteId = object.id;
        this.showConfirmation();
        break;
      default:
        console.log("no action");
    }
  }

  handleEdit(tenant) {
    this.isEdit = true;
    this.currentTenant = tenant;
    this.openmodal();
  }

  async handleDelete() {
    try {
      await TenantsRepository.deleteTenant(this.deleteId);
      this.handleResponse("success", "DELETE TENANT");
    } catch (error) {
      console.error(error);
      this.handleResponse("fail", "DELETE TENANT");
    }
    this.closeConfirmation();
    await this.fetchData();
  }

  showConfirmation() {
    this.openconfirmation = true;
  }

  closeConfirmation() {
    this.openconfirmation = false;
  }

  openmodal() {
    this.openmodel = true;
  }
  closeModal() {
    this.currentTenant = this.getInitialObject();
    this.openmodel = false;
  }
  async saveMethod(event) {
    const newObject = event.detail;
    newObject.id = this.currentTenant.id;
    this.currentTenant = newObject;
    let message = "SAVE TENANT";
    try {
      if (this.isEdit) {
        message = "EDIT TENANT";
        await TenantsRepository.updateTenant(this.currentTenant.id, this.currentTenant.asJSON());
      } else {
        await TenantsRepository.createTenant(this.currentTenant.asJSON());
      }
      this.handleResponse("success", message);
    } catch (error) {
      this.handleResponse("fail", message);
    } finally {
      this.isEdit = false;
      this.currentTenant = this.getInitialObject();
      this.fetchData();
      this.closeModal();
    }
  }

  validateForm() {
    const allValid = [
      ...this.template.querySelectorAll("lightning-input")
    ].reduce((validSoFar, inputCmp) => {
      inputCmp.reportValidity();
      return validSoFar && inputCmp.checkValidity();
    }, true);
    if (allValid) {
      console.log("Is valid");
    } else {
      console.log("invalid form");
    }
  }

  handleResponse(type, message) {
    let toastEvent = null;
    switch (type) {
      case "success":
        toastEvent = new ShowToastEvent({
          title: "Success operation.",
          message: "Operation '"+message+"' executed successfully.",
          variant: "success"
        });
        break;
      case "fail":
        toastEvent = new ShowToastEvent({
          title: "Failed operation",
          message: "Failed executed operation: '"+message+"'.",
          variant: "error"
        });
        break;
      default:
        toastEvent = new ShowToastEvent({
          title: "Unexpected operation.",
          message: "Contact the administrator for more information."
        });
    }
    this.dispatchEvent(toastEvent);
  }

  previousHandler2() {
    console.log("previousHandler2");
  }
  nextHandler2() {
    console.log("next handler 2");
  }

  changeHandler2(event) {
    const det = event.detail;
    // this.page_size = det;
    console.log("det: " + det);
  }
  firstpagehandler() {
    console.log("First page");
  }
  lastpagehandler() {
    console.log("last page");
  }
}
