import { LightningElement, api } from 'lwc';

export default class ConfirmationModal extends LightningElement {

    @api openconfirmation;

    closeConfirmation(){
        this.dispatchEvent(new CustomEvent("closeconfirmation"));
    }

    handleDelete(){
        this.dispatchEvent(new CustomEvent("delete"));
    }

}