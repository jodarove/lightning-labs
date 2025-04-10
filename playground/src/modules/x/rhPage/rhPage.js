import { fromContext } from '@lwc/state';
import { ContextfulLightningElement } from '@lwc/state/context';
import pageState from 'x/pageState';

export default class RhPageApp extends ContextfulLightningElement {
    pageState = fromContext(pageState);

    get routingState() {
        if (!this.pageState.value) {
            return undefined;
        }
        return this.pageState.value.getStates().routingState;
    }

    get pageRecordState() {
        if (!this.pageState.value) {
            return undefined;
        }
        return this.pageState.value.getStates().pageRecord;
    }

    get pageLayoutState() {
        if (!this.pageState.value) {
            return undefined;
        }
        return this.pageState.value.getStates().pageLayout;
    }

    get pageLayoutFieldsState() {
        if (!this.pageState.value) {
            return undefined;
        }
        return this.pageState.value.getStates().pageLayoutFields;
    }
}
