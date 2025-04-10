import { ContextfulLightningElement } from '@lwc/state/context';
import createRoutingState from 'x/routingState';
import createPageState from 'x/pageState';
export default class App extends ContextfulLightningElement {
    pageState = createPageState();

    selectRoute(evt) {
        this.pageState.value.routingState.navigateTo(evt.target.dataset.nav);
        // this.router.value.navigateTo(evt.target.dataset.nav);
    }
}
