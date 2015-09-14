jest.dontMock('../slices-component');
jest.dontMock('react');

React = require('react');


MockComponent = React.createClass({
  displayName: 'MockComponent',

  render: function() {
    return(
      React.createElement('div', {className: this.props.className},
        React.createElement('h1', {}, this.props.user.name),
        React.createElement('p', {}, this.props.dog.names)
      )
    );
  }
});


describe('slices-component', function() {
  beforeEach(function() {
    this.createClass = require('../slices-component');
  });

  describe('constructor', function() {
    it('should expose "this" object with custom methods', function() {
    });
  });

  describe('getQueryParamsFromProps', function() {
    it('should be invoked on willMount/willReceiveProps', function() {
    });

    it('should be invoked with current props and last params', function() {
    });
  });

  describe('getSlicesFromQueryParams', function() {
    it('should be invoked on willMount', function() {
    });

    context('on componentWillReceiveProps', function() {
      context('when queryParams change', function() {
        it('should be invoked', function() {
        });
      });

      context('when queryParams dont change', function() {
        it('should not be invoked', function() {
        });
      });
    });

    it('should be invoked with current params and last slice', function() {
    });
  });

  describe('setQueryParams', function() {
    it('should trigger a setState with new slices', function() {
    });
  });

  context('on componentWillMount', function() {
    it('should add an update callback', function() {
    });
  });

  context('on componentWillReceiveProps', function() {
    context('when not updating', function() {
      context('if the updates change query params', function() {
        it('should setState with the new slices', function() {
        });
      });

      context('if the updates do not change query params', function() {
        it('should not setState', function() {
        });
      });
    });

    context('when updating', function() {
      it('should setState with new slices', function() {
      });
    });
  });

  context('on update handler change', function() {
    context('if component change cursor === update cursor', function() {
      it('should not setState', function() {
      });
    }):
    context('if component change cursor !== update cursor', function() {
      it('should setState with new slices', function() {
      });
    }):
  });

  context('on render', function() {
    it('should render the wrapped component passing props', function() {
    });
  });

  context('on componentWillUnmount', function() {
    it('should remove the update callback', function() {
    });
  });
});
