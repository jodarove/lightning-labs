import { ContextfulLightningElement } from '@lwc/state/context';
import { routingState } from 'x/pageState';
export default class App extends ContextfulLightningElement {
    selectRoute(evt) {
        routingState.value.navigateTo(evt.target.dataset.nav);
        // this.router.value.navigateTo(evt.target.dataset.nav);
    }
}
