import { LightningElement, api } from 'lwc';
import { pageRecord } from 'x/pageState';
export default class RhHighlights extends LightningElement {
    record = pageRecord;

    get hasRecord() {
        return this.record.value.status === 'loaded';
    }

    get recordData() {
        return this.record.value.record;
    }

    renderedCallback() {
        console.log('RH_Highlights rendered');
    }
} 