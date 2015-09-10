import React from 'react';
import Slices from 'slices';

import TodoStore from '../stores/Todo';

class AddTodo extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired }

  getInitialState() {
    return {
      value: '',
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input
            type     = 'text'
            value    = {this.state.value}
            onChange = {this._handleChange.bind(this)}
          />
        </form>
      </div>
    );
  }

  _handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({value: e.currentTarget.value});
  }

  _handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    TodoStore.dispatch('ADD_TODO', {
      user: this.props.user,
      updateParams: {
        todoText: this.state.value,
      },
    });
  }
}


export default Slices.createClass(AddTodo, {
  static propTypes = { user: React.PropTypes.object.isRequired }

  queryParamsFromProps(props, lastProps) {
    return {
      userId: props.user.id,
    };
  }

  slicesFromQueryParams(queryParams, lastQueryParams) {
    return {
      user: this.slices.getByTypeAndId('User', queryParams.userId),
    };
  }
});
