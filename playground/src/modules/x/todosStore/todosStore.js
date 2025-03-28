import { defineState } from '@lwc/state';
import routingState from 'x/routingState';

let todosIds = 1;
const routeToTodos = new Map([
  ['Mike', [{ id: 0, name: 'Mike todo', completed: false }]],
  ['Jose', [{ id: 0, name: 'foo', completed: false }]],
]);

export default defineState((atom, computed, update, fromContext, setAtom) => (who = 'Mike') => {
    if (!routeToTodos.has(who)) {
        routeToTodos.set(who, []);
    }

    const records = routeToTodos.get(who);
    const todos = atom([...records]);

    const createTodo = (name) => {
        records.push({ id: todosIds++, name: name, completed: false });
        setAtom(todos, [...records]);
    };

    const toggleTodo = (id, completed) => {
        const todo = records.find(todo => todo.id === id);
        todo.completed = completed;

        setAtom(todos, [...records]);
    };

    const removeTodo = (id) => setAtom(todos, records.filter(todo =>todo.id !== id));

    const clearCompleted = () => setAtom(todos, [...activeTodos.value]);

  return {
    todos,
    createTodo,
    toggleTodo,
    clearCompleted,
    removeTodo,
  };
});
