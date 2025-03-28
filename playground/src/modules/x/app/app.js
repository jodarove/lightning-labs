import { ContextfulLightningElement } from '@lwc/state/context';
import createRoutingState from 'x/routingState';

export default class App extends ContextfulLightningElement {
    router = createRoutingState();

    selectRoute(evt) {
        this.router.value.navigateTo(evt.target.dataset.nav);
    }
}
