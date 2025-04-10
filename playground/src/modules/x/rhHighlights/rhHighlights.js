import { LightningElement, api } from 'lwc';

export default class RhHighlights extends LightningElement {
    @api record;

    get hasRecord() {
        return this.record.status === 'loaded';
    }

    get recordData() {
        return this.record.record;
    }

} 