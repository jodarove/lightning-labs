import { LightningElement, api } from 'lwc';

export default class RhCustomDetails extends LightningElement {
    @api record;

    get hasRecord() {
        return this.record.value.record !== undefined;
    }

    get customFields() {
        return JSON.stringify(this.record.value.record, null, 2);
    }

} 