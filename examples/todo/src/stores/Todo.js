import Slices from 'slices';

var todos = [{
  id: 1
  userId: '1',
  todoText: 'Gotta do this',
  completed: false,
}, {
  id: 2
  userId: '1',
  todoText: 'And then this do this',
  completed: false,
}];

const TodoStore = {
  registeredEvents: {
    'ADD_TODO': addTodo,
    'TOGGLE_CHECKED_TODO': toggleCheckedTodo,
    'REMOVE_CHECKED_TODOS': removeCheckedTodos,
  },
  addTodo: function addTodo (data) {
    todos.push({
      id: todos.length + 1,
      userId: data.user.id,
      todoText: data.updateParams.todoText,
    });
  },
  toggleCheckedTodo: function toggleCheckedTodo (data) {
    let todo = todos.find(todo => todo.id === data.updateParams.todoId);
    todo.completed = !todo.completed;
  },
  removeCheckedTodos: function removeCheckedTodos (data) {
    let userId = data.user.id;
    todos = todos.filter(todo => {
      return todo.userId !== userId || !todo.completed;
    });
  },
  dispatch: function dispatch (EVENT, data) {
    if (EVENT in TodoStore.registeredEvents) {
      TodoStore[EVENT](data);
      Slices.update();
    }
  },
};


export default TodoStore;
