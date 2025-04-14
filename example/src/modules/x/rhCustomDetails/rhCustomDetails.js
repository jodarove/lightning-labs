import { LightningElement } from 'lwc';
import { pageRecord } from 'x/pageState';

export default class RhCustomDetails extends LightningElement {
    record = pageRecord;

    get hasRecord() {
        return this.record.value.record !== undefined;
    }

    get customFields() {
        return JSON.stringify(this.record.value.record, null, 2);
    }
    renderedCallback() {
        console.log('CustomDetailsCmp rendered');
    }
} 