import React from 'react';
import Slices from 'slices';

import Todos from './Todos';

class User extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  render() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        <Todos todos={this.props.todos} />
      </div>
    );
  }
}


export default Slices.createClass(User, {
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  queryParamsFromProps: (props, lastProps) => {
    return {
      userId: props.user.id,
    };
  },

  slicesFromQueryParams: (queryParams, lastQueryParams) => {
    return {
      user: this.slices.getByTypeAndId('User', queryParams.userId),
      todos: this.slices.getTodosByUserId(queryParams.userId),
    };
  },
});
