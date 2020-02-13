import { LightningElement, track, api } from "lwc";
import definitionsRepository from "c/definitionsRepository";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import PagedRequestData from "c/pagedRequestData";

const columns = [
  { label: "Name", fieldName: "name", sortable: true },
  { label: "Description", fieldName: "description", sortable: true },
  { label: "Source", fieldName: "formattedSourceAddress", sortable: true },
  {
    label: "Destination",
    fieldName: "formattedDestinationAddress",
    sortable: true
  },
  {
    label: "Sleep interval",
    fieldName: "sleepInterval",
    type: "number",
    sortable: true
  },
  { label: "TTL", fieldName: "ttl", type: "number", sortable: true },
  {
    label: "Edit",
    type: "button",
    initialWidth: 100,
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

export default class BatchJobsDefinition extends LightningElement {
  @track data = [];
  @api currentDefinition = {};
  @track openmodel = false;
  @api isEdit = false;
  @api openconfirmation = false;

  @api pageNumber = 1;
  @api pageSize = 5;
  @track pagedRequestData;
  @track totalItems;
  @api pageModel;
  // @api pagesList = [];

  columns = columns;

  async connectedCallback() {
    this.pagedRequestData = new PagedRequestData({
      pageNumber: this.pageNumber - 1,
      pageSize: this.pageSize
    });
    await this.fetchData();
  }

  async fetchData() {
    try {
      /*
        pageNumber: pageNumber-1
        pageSize: pageSize
        sortBy
        sortDesc
      **/
      this.pagedRequestData.pageNumber = this.pageNumber - 1;
      this.pagedRequestData.page = this.pagedRequestData.pageNumber;
      this.pageModel = await definitionsRepository.getPaged(
        this.pagedRequestData
      );
      // this.updatePagesList();
      this.data = this.pageModel.records;
      this.handleResponse("success");
    } catch (error) {
      this.handleResponse("fail");
    }
  }

  async onPageClick(event) {
    this.pageNumber = event.detail;
    this.fetchData();
    // console.log('number: '+this.pageNumber);
  }

  handleRowAction(cmp, event, helper) {
    const action = cmp.detail.action.name;
    const object = cmp.detail.row;
    this.currentDefinition = object;

    switch (action) {
      case "edit":
        this.isEdit = true;
        this.handleEdit();
        break;
      case "delete":
        this.showConfirmation();
        break;
      default:
        console.log("no action");
    }
  }

  handleEdit() {
    this.openmodal();
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
    this.currentDefinition = {};
    this.openmodel = false;
  }

  async handleDelete() {
    try {
      await definitionsRepository.deleteDefinition(this.currentDefinition.id);
      await this.fetchData();
      this.handleResponse("success");
    } catch (error) {
      this.handleResponse("fail");
    }

    this.closeConfirmation();
  }

  async saveDefinition(event) {
    const newObject = event.detail;

    console.log("ADD: " + JSON.stringify(newObject));

    let message = "SAVE DEFINITION";
    try {
      if (this.isEdit) {
        newObject.id = this.currentDefinition.id;
        message = "EDIT DEFINITION";
        await definitionsRepository.updateDefinition(newObject.id, newObject);
      } else {
        await definitionsRepository.createDefinition(newObject);
      }
      this.currentDefinition = newObject;
      this.handleResponse("success", message);
    } catch (error) {
      console.error(error);
      this.handleResponse("fail", message);
    } finally {
      this.isEdit = false;
      this.currentDefinition = null;
      this.fetchData();
      this.closeModal();
    }
  }

  getInitialObject() {
    return {
      name: ""
    };
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
