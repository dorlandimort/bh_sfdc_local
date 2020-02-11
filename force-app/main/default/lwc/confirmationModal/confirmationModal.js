import { LightningElement, api } from 'lwc';

export default class ConfirmationModal extends LightningElement {

    @api openconfirmation;

    closeModal(){
        this.dispatchEvent(new CustomEvent("closemodal"));
    }

    closeConfirmation(){
        this.dispatchEvent(new CustomEvent("closeconfirmation"));
    }

    handleDelete(){
        this.dispatchEvent(new CustomEvent("delete"));
    }

}