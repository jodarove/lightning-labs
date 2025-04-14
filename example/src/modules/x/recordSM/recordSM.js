import { defineState } from '@lwc/state';

const recordSM = defineState((atom, computed, update, fromContext, setAtom) => {

    return ({ objectApiName, recordId, fields } = {}) => {
        let inflight;
        let ssrRendered = 0;


        const status = atom('unconfigured');
        const error = atom();
        const record = atom();

        const setConfig = ({ objectApiName, recordId, fields }) => {
            setAtom(error, undefined);
            setAtom(record, undefined);

            if (! objectApiName || ! recordId || ! fields || fields.length === 0) {
                setAtom(status, 'unconfigured');
            } else {
                setAtom(status, 'loading');
                if (inflight) {
                    clearTimeout(inflight);
                }

                console.warn("Loading record for", { objectApiName, recordId, fields });
                const setRecord = ()=> {
                    console.warn("Loaded record for", { objectApiName, recordId, fields });
                    inflight = undefined;
                    setAtom(status, 'loaded'); // data ? 'loaded' : 'error';
                    setAtom(error, undefined); // = error_?.message;
                    setAtom(record, {
                        apiName: objectApiName,
                        id: recordId,
                        recordTypeId: `${objectApiName}-${recordId}`,
                        ...Object.assign(
                            {},
                            ...fields.map(f => ({ [f]: `${f}_value` })),
                        )
                    });
                }
                // it takes .5 seconds to load a record
                if (import.meta.env.SSR) {
                    ssrRendered = true;
                    setRecord();
                } else if (ssrRendered) {
                    ssrRendered = false;
                    setRecord();
                } else {
                    if (ssrRendered++ < 3) {
                        setRecord();
                        return;
                    }
                    inflight = setTimeout(() => {
                        setRecord();
                    }, 1000);
                }
            }
        }
        
        if (objectApiName || recordId || fields) {
            setConfig(objectApiName, recordId, fields);
        }

        return {
            status,
            error,
            record,
            setConfig,
        };
    }
});

export default recordSM;