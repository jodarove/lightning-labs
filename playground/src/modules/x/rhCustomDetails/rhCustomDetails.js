import { LightningElement, api } from 'lwc';

export default class RhCustomDetails extends LightningElement {
    @api record;

    get hasRecord() {
        return this.record.record !== undefined;
    }

    get customFields() {
        return JSON.stringify(this.record.record, null, 2);
    }

} 