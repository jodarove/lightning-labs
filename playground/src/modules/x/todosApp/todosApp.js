import { fromContext } from '@lwc/state';
import { ContextfulLightningElement } from '@lwc/state/context';
import routerState from 'x/routingState';
import todoState from 'x/todosState';
import recordSM from 'x/recordSM';
import createRecordHomeSME from 'x/recordHomeSME';

export default class TodoApp extends ContextfulLightningElement {
    router = fromContext(routerState);
    state = todoState();
    activeList = 'all';
    recordSM = recordSM();
    
    recordHomeSME = createRecordHomeSME();

    config;
    rhConfig;

    connectedCallback() {
        super.connectedCallback();

        this.router.subscribe(() => {
            this.initializeRecordSM();
            this.initializeRecordHomeSME();
        });
        this.initializeRecordSM();
        this.initializeRecordHomeSME();
    }

    initializeRecordSM() {
        this.config = {
            objectApiName: this.router.value.objectApiName,
            recordId: this.router.value.recordId,
            fields: [
                'Id',
                'Name',
            ]
        };
        this.recordSM.value.setConfig(this.config);
    }

    get rhRecord() {
        return JSON.stringify(this.recordHomeSME.value.record);
    }

    get rhLayout() {
        return JSON.stringify(this.recordHomeSME.value.layout);
    }

    initializeRecordHomeSME() {
        this.rhConfig = {
            objectApiName: this.router.value.objectApiName,
            recordId: this.router.value.recordId,
        };
        this.recordHomeSME.value.setConfig(this.rhConfig);
    }

    get recordFields() {
        const fields = [];
        const smRecord = this.recordSM.value.record;
        if (smRecord !== undefined) {
            Object.entries(smRecord).forEach(([key, value]) => {
                fields.push({ key, value })
            });
        }
        return fields;
    }

    get activeLeft() {
        return this.state.value.activeTodos.length;
    }

    get todos() {
        if (this.activeList === 'all') {
            return this.state.value.allTodos;
        } else if (this.activeList === 'active') {
            return this.state.value.activeTodos;
        } else {
            return this.state.value.completedTodos;
        }
    }

    saveTodo(evt) {
        if (evt.keyCode === 13) {
            const newTodo = evt.target.value;
            // save todo from state manager
            this.state.value.createTodo(newTodo);
            evt.target.value = '';

        }
    }

    selectFilter(evt) {
        this.activeList = evt.target.dataset.value;
    }

    toggleTodo(evt) {
        this.state.value.toggleTodo(evt.detail.todoId, evt.detail.todoCompleted);
    }

    removeTodo(evt) {
        this.state.value.removeTodo(evt.detail.todoId);
    }
}
