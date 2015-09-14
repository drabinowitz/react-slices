import React from 'react';
import * as updateHandler from './slices-update-handler';
import depthNComparator from './slices-n-deep-comparator'

var depth2Comparator = depthNComparator(2);

export default function createClass (ComponentClass, sliceProps) {
  var {getQueryParamsFromProps, getSlicesFromQueryParams, ...restSliceProps} =
    sliceProps;

  getQueryParamsFromProps = getQueryParamsFromProps.bind(restSliceProps);
  getSlicesFromQueryParams = getSlicesFromQueryParams.bind(restSliceProps);
  class SlicesWrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this._localChangeCursor = null;
      this.state = { queryParams };
    }

    componentWillMount() {
      this._updateKey =
        updateHandler.add(this._onUpdateHandlerChange.bind(this));

      this.setState({
        slices: getSlicesFromQueryParams(queryParams)
      });
    }

    componentWillReceiveProps(nextProps) {
      var changeCursor = updateHandler.getChangeCursor();
      if (changeCursor) {
        this._handleUpdate(props, changeCursor);
      }
    }

    _onUpdateHandlerChange() {
      this._handleUpdate(this.props);
    }

    _handleUpdate(props, currentChangeCursor=updateHandler.getChangeCursor()) {
      if (currentChangeCursor !== this._localChangeCursor) {

      }

      this._localChangeCursor = currentChangeCursor;
    }

    componentWillUnmount() {
      updateHandler.remove(this._updateKey);
    }
  }

  SlicesWrapperComponent.displayName = `Slices (${ComponentClass.displayName})`

  return SlicesWrapperComponent;
};
