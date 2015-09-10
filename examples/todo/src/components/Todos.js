import React from 'react';
import Slices from 'slices';

import Todo from './Todo';

class Todos extends React.Component {
  static propTypes = {
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  render() {
    var todos = this.props.todos.map(todo => (
      <Todo key={todo.id} todo={todo} />
    ));

    return (
      <div>
        {todos}
      </div>
    );
  }
}


export default Slices.createClass(Todo, {
  static propTypes = {
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  queryParamsFromProps(props, lastProps) {
    return {
      todoIds: props.todos.map(todo => todo.id)
    };
  }

  slicesFromQueryParams(queryParams, lastQueryParams) {
    return {
      todos: this.slices.getByTypeAndIds('Todo', queryParams.todoIds)
    };
  }
});
