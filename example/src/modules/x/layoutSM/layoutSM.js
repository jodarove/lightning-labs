import { defineState } from '@lwc/state';

const mockLayout = (who) => ({
    sections: [
        {
            layoutRows: [
                {
                    layoutItems: [
                        {
                            layoutComponents: [
                                {
                                    componentType: 'Field',
                                    apiName: who + 'firstName'
                                },
                                {
                                    componentType: 'Field',
                                    apiName: who + 'lastName'
                                }
                            ]
                        }
                    ]
                },
                {
                    layoutItems: [
                        {
                            layoutComponents: [
                                {
                                    componentType: 'Button',
                                    apiName: 'saveButton'
                                }
                            ]
                        },
                        {
                            layoutComponents: [
                                {
                                    componentType: 'Field',
                                    apiName: who + 'emailAddress'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            layoutRows: [
                {
                    layoutItems: [
                        {
                            layoutComponents: [
                                {
                                    componentType: 'Field',
                                    apiName: who + 'phoneNumber'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

const resultsMap = new Map([
    ['Mike-mike-id', mockLayout('mike')],
    ['Jose-jose-id', mockLayout('jose')],
]);

const layout = defineState((atom, computed, update, fromContext, setAtom) => {

    return ({ objectApiName, recordTypeId } = {}) => {
        let ssrRendered = true;

        let inflight;

        const status = atom('unconfigured');
        const error = atom();
        const layout = atom();

        let cObjectApiName = -1;
        let cRecordTypeId = -2;

        const setConfig = ({ objectApiName, recordTypeId }) => {
            if (cObjectApiName === objectApiName && cRecordTypeId === recordTypeId) {
                return;
            }
            cObjectApiName = objectApiName;
            cRecordTypeId = recordTypeId;

            setAtom(error, undefined);
            setAtom(layout, undefined);

            if (! objectApiName || ! recordTypeId) {
                setAtom(status, 'unconfigured');
            } else {
                setAtom(status, 'loading');
                if (inflight) {
                    clearTimeout(inflight);
                }

                console.warn("Loading layout for", { objectApiName, recordTypeId });

                const setLayout = ()=> {
                    console.warn("Loaded layout for", { objectApiName, recordTypeId });
                    inflight = undefined;
                    setAtom(status, 'loaded'); // data ? 'loaded' : 'error';
                    setAtom(error, undefined); // = error_?.message;
                    setAtom(layout, resultsMap.get(recordTypeId));
                }
                console.error('import.meta.env.SSR', import.meta.env.SSR);

                if (import.meta.env.SSR) {
                    ssrRendered = true;
                    setLayout();
                } else if (ssrRendered) {
                    ssrRendered = false;
                    setLayout();
                } else {
                    // it takes .5 seconds to load a record
                    inflight = setTimeout(() => {
                        setLayout();
                    }, 2000);
                }
            }
        }
        
        if (objectApiName || recordTypeId) {
            setConfig(objectApiName, recordTypeId);
        }

        return {
            status,
            error,
            layout,
            setConfig,
        };
    }
});

export default layout;