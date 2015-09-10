import React from 'react';
import Slices from 'slices';

class Todo extends React.Component {
  static propTypes = { todo: React.PropTypes.object.isRequired }

  render() {
    var todo = this.props.todo;
    return (
      <div>
        <p>{todo.text}</p>
        <input type='checkbox' checked={todo.completed} />
      </div>
    );
  }
}


export default Slices.createClass(Todo, {
  static propTypes = { todo: React.PropTypes.object.isRequired }

  queryParamsFromProps(props, lastProps) {
    return {
      todoId: props.todo.id,
    };
  }

  slicesFromQueryParams(queryParams, lastQueryParams) {
    return {
      todo: this.slices.getByTypeAndId('Todo', queryParams.todoId),
    };
  }
});
