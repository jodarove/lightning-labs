import { defineState } from '@lwc/state';

const recordSM = defineState((atom, computed, update, fromContext, setAtom) => {
    return ({ objectApiName, recordId, fields } = {}) => {
        let inflight;

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
                // it takes .5 seconds to load a record
                inflight = setTimeout(() => {
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
                }, 1000);
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