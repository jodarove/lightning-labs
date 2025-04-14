import { LightningElement } from 'lwc';
import { pageLayout, pageLayoutFields } from 'x/pageState';

export default class RhDetails extends LightningElement {
    layout = pageLayout;
    record = pageLayoutFields;

    get hasData() {
        return this.layout.value.status === 'loaded' && this.record.value.status === 'loaded';
    }

    get rhLayout() {
        return JSON.stringify(this.layout.value.layout, null, 2);
    }

    get rhLayoutFields() {
        return JSON.stringify(this.record.value.record, null, 2);
    }

    renderedCallback() {
        console.log('RH_Details rendered');
    }
} 