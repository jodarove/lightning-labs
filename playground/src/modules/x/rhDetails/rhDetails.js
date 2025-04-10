import { LightningElement, api } from 'lwc';

export default class RhDetails extends LightningElement {
    @api layout;
    @api record;

    get hasData() {
        return this.layout.status === 'loaded' && this.record.status === 'loaded';
    }

    get rhLayout() {
        return JSON.stringify(this.layout.layout, null, 2);
    }

    get rhLayoutFields() {
        return JSON.stringify(this.record.record, null, 2);
    }
} 