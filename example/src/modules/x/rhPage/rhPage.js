import { LightningElement } from 'lwc';
import { routingState } from 'x/pageState';

export default class RhPageApp extends LightningElement {
    routingState = routingState;

    renderedCallback() {
        console.log('RH_Page rendered');
    }
}
