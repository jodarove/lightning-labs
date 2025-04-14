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

function effect(signals, fn) {
    // this function can't be async, otherwise it will break the SSR rendering.
    for (const signal of signals) {
        signal.subscribe(fn);
    }

    fn();
}

// Data providers
export const routingState = createRoutingSM(); 
export const pageRecord = createRecordSM();
export const pageLayout = createLayoutSM();
export const pageLayoutFields = createRecordSM();

// I/O relationships
effect([routingState], () => {
    pageRecord.value.setConfig({
        objectApiName: routingState.value.objectApiName,
        recordId: routingState.value.recordId,
        fields: ['Id', 'Name'],
    });
});

effect([routingState, pageRecord], () => {
    pageLayout.value.setConfig({
        objectApiName: routingState.value.objectApiName,
        recordTypeId: pageRecord.value.record?.recordTypeId,
    });
});

effect([routingState, pageLayout], () => {
    // these should probably be in the layout.
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

