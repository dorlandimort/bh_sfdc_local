import { LightningElement, track, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import usersRepository from "c/usersRepository";

const columns = [
  { label: "Display name", fieldName: "displayName" },
  { label: "E-mail address", fieldName: "emailAddress" },
  {
    label: "Change password",
    type: "button",
    initialWidth: 150,
    typeAttributes: {
      label: { fieldName: "actionLabel" },
      title: "Click to Change password",
      name: "change-password",
      iconName: "utility:edit",
      disabled: { fieldName: "actionDisabled" },
      class: "btn_next"
    }
  },
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

export default class Users extends LightningElement {
  @api openconfirmation = false;
  @api currentUser = {
    id: 0,
    displayName: ""
  };
  @api isEdit = false;

  @track data = [];
  columns = columns;
  @track openmodel = false;
  @track deleteId = 0;
  @track totalElements = 0;

  async connectedCallback() {
    await this.fetchData();
  }

  async fetchData() {
    try {
      const data = await usersRepository.get();
      this.data = data;
      this.handleResponse("success");
    } catch (error) {
      this.handleResponse("fail");
    }
  }

  getInitialObject() {
    return {
      name: ""
    };
  }

  handleRowAction(cmp, event, helper) {
    const action = cmp.detail.action.name;
    const object = cmp.detail.row;
    this.currentUser = object;

    switch (action) {
      case "edit":
        this.handleEdit();
        break;
      case "delete":
        this.deleteId = object.id;
        this.showConfirmation();
        break;
      case "change-password":
        this.changePassword();
        break;
      default:
        console.log("no action");
    }
  }

  handleEdit() {
    this.isEdit = true;
    this.openmodal();
  }

  async handleDelete() {
    try {
      await usersRepository.deleteUser(this.deleteId);
      await this.fetchData();
      this.handleResponse("success");
    } catch (error) {
      this.handleResponse("fail");
    }

    this.closeConfirmation();
  }

  changePassword() {
    // this.changePassword = true;
    // this.openmodal();
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
    this.currentUser = this.getInitialObject();
    this.openmodel = false;
  }

  async updatePassword(event){
    // const newPassword = event.detail;
    // console.log('update password');
    this.changePassword = false;
  }

  async saveUser(event) {
    const newObject = event.detail;
    // newObject.id = this.currentUser.id;
    this.currentUser = newObject;
    let message = "SAVE TENANT";
    try {
      if (this.isEdit) {
        message = "EDIT TENANT";
        await usersRepository.updateUser(
          newObject.id,
          this.currentUser.asJSON()
        );
      } else {
        await usersRepository.createUser(this.currentUser.asJSON());
      }
      this.handleResponse("success", message);
    } catch (error) {
      console.error(error);
      this.handleResponse("fail", message);
    } finally {
      this.isEdit = false;
      this.currentTenant = this.getInitialObject();
      this.fetchData();
      this.closeModal();
    }
  }

  /**
   * HANDLE RESPONSE
   */
  handleResponse(type) {
    let toastEvent = null;
    switch (type) {
      case "success":
        toastEvent = new ShowToastEvent({
          title: "Success operation.",
          message: "Operation executed successfully.",
          variant: "success"
        });
        break;
      case "fail":
        toastEvent = new ShowToastEvent({
          title: "Failed operation",
          message: "Failed executed operation.",
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
  /**
   * END OF HANDLE RESPONSE
   */
}
