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

    // get pageRecordState() {
    //     return this.pageState.value.getState().pageRecord;
    // }

    // get pageLayoutState() {
    //     return this.pageState.value.getState().pageLayout;
    // }

    // get pageLayoutFieldsState() {
    //     return this.pageState.value.getState().pageLayoutFields;
    // }
}
