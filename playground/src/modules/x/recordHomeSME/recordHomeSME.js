import { defineState } from '@lwc/state';
import createLayoutSM from 'x/layoutSM';
import createRecordSM from 'x/recordSM';

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

const recordHomeSM = defineState((atom, computed, update, fromContext, setAtom) => {
    return ({ objectApiName, recordId } = {}) => {
        let recordSM = createRecordSM();
        let layoutSM = createLayoutSM();
        let secondRecordSM =  createRecordSM();

        const status = atom('unconfigured');
        const error = atom(undefined);
        const layout = atom(undefined);
        const record = atom(undefined);

        recordSM.subscribe(() => {
            const { status: rStatus, error: rError, record: rRecord } = recordSM.value;
            if (rStatus === 'loading') {
                setAtom(status, 'loading');
            } else if (rStatus === 'loaded') {
                // load the layout
                layoutSM.value.setConfig({
                    objectApiName: rRecord.apiName,
                    recordTypeId: rRecord.recordTypeId,
                })
            } else if (rStatus === 'error') {
                setAtom(status, 'error');
                setAtom(error, rError);
            }
        });

        layoutSM.subscribe(() => {
            const { status: lStatus, error: lError, layout: lLayout } = layoutSM.value;
            const { record: rRecord } = recordSM.value;
            if (lStatus === 'loaded') {
                // load the second record
                const fields = computeFieldsFromLayout(lLayout);
                secondRecordSM.value.setConfig({
                    objectApiName: rRecord.apiName,
                    recordId: rRecord.id,
                    fields,
                });
                setAtom(layout, lLayout);
            } else if (lStatus === 'error') {
                setAtom(status, 'error');
                setAtom(error, lError);
            }
        });

        secondRecordSM.subscribe(() => {
            const { status: rStatus, error: rError, record: rRecord } = secondRecordSM.value;

            if (rStatus === 'loaded') {
                setAtom(status, 'loaded');
                setAtom(record, rRecord);
            } else if (rStatus === 'error') {
                setAtom(status, 'error');
                setAtom(error, rError);
            }
        });

        const setConfig = ({ objectApiName, recordId }) => {
            setAtom(status, 'unconfigured');
            setAtom(record, undefined);
            setAtom(error, undefined);
            setAtom(layout, undefined);
            layoutSM.value.setConfig({});
            secondRecordSM.value.setConfig({});

            if (objectApiName && recordId) {
                recordSM.value.setConfig({ objectApiName, recordId,  fields: ['Id']});
            }
        };

        if (objectApiName || recordId) {
            setConfig({ objectApiName, recordId });
        }

        return {
            status,
            error,
            record,
            layout,
            setConfig,
        }
    }
});

export default recordHomeSM;