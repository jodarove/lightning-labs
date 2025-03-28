import { defineState } from '@lwc/state';
// import routingState from 'x/routingState';

let todosIds = 1;
const routeToTodos = new Map();

export default defineState((atom, computed, update, fromContext, setAtom) => (routing) => {
  // const routing = fromContext(routingState);
  // const who = computed({ routing }, ({ routing }) => routing.value.currentRoute);
  let records = [];
  const allTodos = atom([]);

  // let records;

  // const initializeTodos = () => {
  //   if (!routeToTodos.has(who.value)) {
  //     routeToTodos.set(who.value, []);
  //   }
  
  //   records = routeToTodos.get(who.value);
  //   setAtom(allTodos, [...records]);
  // }
  

  // who.subscribe(initializeTodos);
  // initializeTodos();

  const activeTodos = computed({ allTodos }, ({ allTodos }) => (allTodos.filter(todo =>!todo.completed)));

  const completedTodos = computed({ allTodos }, ({ allTodos }) => (allTodos.filter(todo => todo.completed)));

  // const createTodo = update({ allTodos }, ({ allTodos }, newTodo) => {
  //   // start first by updating the array, then start testing returning the same array.
  //   return {
  //     allTodos: [...allTodos, { id: todosIds++, name: newTodo, completed: false }],
  //   }
  // });
  const createTodo = (name) => {
    records.push({ id: todosIds++, name: name, completed: false });
    
    activeTodos // 
    setAtom(allTodos, [...records]);
  };

  // const toggleTodo = update({ allTodos }, (_, todoId, completed) => {
  //   const todo = allTodos.value.find(todo => todo.id === todoId);
  //   todo.completed = completed;

  //   return {
  //     allTodos: [...allTodos.value],
  //   }
  // });
  const toggleTodo = (id, completed) => {
    const todo = records.find(todo => todo.id === id);
    todo.completed = completed;

    setAtom(allTodos, [...records]);
  };

  // const removeTodo = update({ allTodos }, (_, todoId) => {
  //   return {
  //     allTodos: allTodos.value.filter(todo =>todo.id !== todoId),
  //   }
  // });

  const removeTodo = (id) => {
    records = records.filter(todo =>todo.id!== id);
    // routeToTodos.set(who.value, records);
    setAtom(allTodos, [...records]);
  }

  // const clearCompleted = update({ allTodos }, () => {
  //   return {
  //     allTodos: [...activeTodos.value],
  //   }
  // });
  const clearCompleted = () => {
    records = [...activeTodos.value];
    // routeToTodos.set(who.value, records);
    setAtom(allTodos, [...records]);
  }

  return {
    allTodos,
    activeTodos,
    completedTodos,
    createTodo,
    toggleTodo,
    clearCompleted,
    removeTodo,
  };
});
