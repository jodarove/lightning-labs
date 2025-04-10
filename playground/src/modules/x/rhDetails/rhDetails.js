import { LightningElement, api } from 'lwc';

export default class RhDetails extends LightningElement {
    @api layout;
    @api record;

    get hasData() {
        return this.layout.value.status === 'loaded' && this.record.value.status === 'loaded';
    }

    get rhLayout() {
        return JSON.stringify(this.layout.value.layout, null, 2);
    }

    get rhLayoutFields() {
        return JSON.stringify(this.record.value.record, null, 2);
    }
} 