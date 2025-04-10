import { defineState } from '@lwc/state';
import createLayoutSM from 'x/layoutSM';
import createRecordSM from 'x/recordSM';
import createRoutingSM from 'x/routingState';

function computeFieldsFromLayout(layout) {
    const result = [];

    layout.sections.forEach(section => {
        section.layoutRows.forEach(layoutRow => {
            layoutRow.layoutItems.forEach(layoutItem => {
                layoutItem.layoutComponents.forEach(layoutComponent => {
                    if (layoutComponent.componentType === 'Field') {
                        result.push(layoutComponent.apiName);
                    }
                });
            });
        });
    });

    return result;
}

function edge(signals, concequence) {
    for (const signal of signals) {
        signal.subscribe(() => {
            concequence();
        });
    }

    concequence();
}

export default defineState((atom, computed, update, fromContext, setAtom) => {
    const routingState = createRoutingSM();
    const pageRecord = createRecordSM();
    const pageLayout = createLayoutSM();
    const pageLayoutFields = createRecordSM();

    edge([routingState], () => {
        pageRecord.value.setConfig({
            objectApiName: routingState.value.objectApiName,
            recordId: routingState.value.recordId,
            fields: ['Id', 'Name'],
        });
    });

    edge([routingState, pageRecord], () => {
        pageLayout.value.setConfig({
            objectApiName: routingState.value.objectApiName,
            recordTypeId: pageRecord.value.record?.recordTypeId,
        });
    });

    edge([routingState,pageLayout], () => {
        let fields = undefined;
        if (pageLayout.value.status === 'loaded' && pageLayout.value.layout) {
            fields = computeFieldsFromLayout(pageLayout.value.layout);
        }
        pageLayoutFields.value.setConfig({
            recordId: routingState.value.recordId,
            objectApiName: routingState.value.objectApiName,
            fields,
        });
    });

    const getStates = () => {
        return {
            routingState,
            pageRecord,
            pageLayout,
            pageLayoutFields,
        }
    }

    return (...args) => {
        return {
            routingState,
            pageRecord,
            pageLayout,
            pageLayoutFields,
            getStates,
        }
    }
})