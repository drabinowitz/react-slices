import React from 'react';
import Slices from 'slices';

class User extends Slices.Component {
  constructor(props) {
    super(props);
  }

  slicesFromProps(props) {
    return {
      user: this.state.slices.getById(props.userId)
    };
  }

  render() {
    var user = this.state.slices.data.user;

    return (
      <div>
        {user.text}
      </div>
    );
  }
}

User.propTypes = { userId: React.PropTypes.string.isRequired };


export default User
