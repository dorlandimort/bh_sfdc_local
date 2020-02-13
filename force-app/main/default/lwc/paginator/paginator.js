import { LightningElement, api, track } from "lwc";

export default class Paginator extends LightningElement {
  @api pageSize;
  @api pageNumber = 1;
  @api pageModel;

  @api
  changeView() {
    if (this.pageModel) {
      console.log('changeView() running...');
      
      if (this.pageNumber === 1) {
        this.template.querySelector(
          "lightning-button.FirstPage"
        ).disabled = true;
      } else {
        this.template.querySelector(
          "lightning-button.FirstPage"
        ).disabled = false;
      }
      if (this.pageNumber === 1) {
        this.template.querySelector(
          "lightning-button.Previous"
        ).disabled = true;
      } else {
        this.template.querySelector(
          "lightning-button.Previous"
        ).disabled = false;
      }
      if (parseInt(this.pageNumber,10)=== parseInt(this.pageModel.totalPages,10)) {
        this.template.querySelector(
          "lightning-button.LastPage"
        ).disabled = true;
      } else {
        this.template.querySelector(
          "lightning-button.LastPage"
        ).disabled = false;
      }
      if (parseInt(this.pageNumber, 10) === parseInt(this.pageModel.totalPages, 10)) {
        this.template.querySelector("lightning-button.Next").disabled = true;
      } else {
        this.template.querySelector("lightning-button.Next").disabled = false;
      }
    }
  }

  renderedCallback() {
    this.changeView();
  }

  previousHandler1() {
    this.emitEvent(this.pageNumber-1);
  }

  nextHandler1() {
    this.emitEvent(this.pageNumber+1);
  }
  FirstPageHandler1() {
    this.emitEvent(1);
  }
  LastPageHandler1() {
    this.emitEvent(this.pageModel.totalPages);
  }
  
  onPageClick(e) {
    let newPageNumber = parseInt(e.target.dataset.id, 10);
    this.emitEvent(newPageNumber);
  }

  emitEvent(newPageNumber){
    this.pageNumber = newPageNumber;
    const event = new CustomEvent("pageclick", { detail: this.pageNumber });
    this.dispatchEvent(event);
  }

 @api get pagesList() {
    let newList = [];

    if(this.pageModel){
      let i = 0;
      for (let k = 2; k >= 1; k--) {
        if(this.pageNumber-k>0){
          newList[i] = this.pageNumber-k;
          i++;
        }
      }
      newList[i] = this.pageNumber;
      i++;
      for (let k = 1; k <= 2; k++) {
        if(this.pageNumber+k<=this.pageModel.totalPages){
          newList[i] = this.pageNumber+k;
          i++;
        }
      }
    }
    return newList;
  }

}
