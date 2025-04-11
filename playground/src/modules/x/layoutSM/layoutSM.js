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
        let inflight;

        const status = atom('unconfigured');
        const error = atom();
        const layout = atom();

        const setConfig = ({ objectApiName, recordTypeId }) => {
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

                // it takes .5 seconds to load a record
                inflight = setTimeout(() => {
                    console.warn("Loaded layout for", { objectApiName, recordTypeId });
                    inflight = undefined;
                    setAtom(status, 'loaded'); // data ? 'loaded' : 'error';
                    setAtom(error, undefined); // = error_?.message;
                    setAtom(layout, resultsMap.get(recordTypeId));
                }, 2000);
            }
        }

        // pepe
        
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