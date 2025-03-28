import { LightningElement, api } from 'lwc';

export default class TodoItem extends LightningElement {
    @api todoId;
    @api todoName;
    @api todoCompleted;

    toggleTodo() {
        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: {
                    todoId: this.todoId,
                    todoCompleted:!this.todoCompleted
                },
                bubbles: false,
                composed: true
            })
        );
    }

    removeTodo() {
        this.dispatchEvent(
            new CustomEvent('remove', {
                detail: {
                    todoId: this.todoId,
                },
                bubbles: false,
                composed: true
            })
        );
    }
}
