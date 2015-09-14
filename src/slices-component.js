import React from 'react';
import * as updateHandler from './slices-update-handler';
import depthNComparator from './slices-n-deep-comparator'

var depth2Comparator = depthNComparator(2);

export default function createClass (ComponentClass, sliceProps) {
  var {constructor, getQueryParamsFromProps, getSlicesFromQueryParams} =
    sliceProps;

  class SlicesWrapperComponent extends React.Component {
    constructor(props) {
      super(props);
      this.local = {};
      constructor.apply(this.local);
      this.getQueryParamsFromProps = getQueryParamsFromProps.bind(this);
      this.getSlicesFromQueryParams = getSlicesFromQueryParams.bind(this);
      this._localChangeCursor = null;
    }

    componentWillMount() {
      this._updateKey =
        updateHandler.add(this._onUpdateHandlerChange.bind(this));

      let queryParams = this.getQueryParamsFromProps(this.props, null);

      this._triggerQueryForSlices(queryParams);
    }

    componentWillReceiveProps(nextProps) {
      var changeCursor = updateHandler.getChangeCursor();
      if (changeCursor) {
        this._handleUpdate(props, changeCursor);
      } else {
        let queryParams = this.getQueryParamsFromProps(nextProps);
        if (!depth2Comparator(queryParams, this.state.queryParams)) {
          this._triggerQueryForSlices(queryParams, this.state.slices);
        }
      }
    }

    _onUpdateHandlerChange() {
      this._handleUpdate(this.props);
    }

    _handleUpdate(props, currentChangeCursor=updateHandler.getChangeCursor()) {
      if (currentChangeCursor !== this._localChangeCursor) {
        let queryParams =
          this.getQueryParamsFromProps(props, this.state.queryParams);

        this._triggerQueryForSlices(queryParams, this.state.slices);
      }

      this._localChangeCursor = currentChangeCursor;
    }

    _triggerQueryForSlices(queryParams, prevSlices=null) {
      this.setState({
        queryParams,
        slices: this.getSlicesFromQueryParams(queryParams, prevSlices)
      });
    }

    componentWillUnmount() {
      updateHandler.remove(this._updateKey);
    }
  }

  SlicesWrapperComponent.displayName = `Slices (${ComponentClass.displayName})`

  return SlicesWrapperComponent;
};
