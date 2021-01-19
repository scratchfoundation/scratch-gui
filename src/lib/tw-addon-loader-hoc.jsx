import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

let didLoadAddons = false;

const TWAddonLoaderHOC = function (WrappedComponent) {
  class AddonLoaderComponent extends React.Component {
    componentDidMount () {
      if (!this.props.isPlayerOnly) {
        this.loadAddons();
      }
    }
    componentDidUpdate () {
      if (!this.props.isPlayerOnly) {
        this.loadAddons();
      }
    }
    loadAddons () {
      if (didLoadAddons) {
        return;
      }
      didLoadAddons = true;
      this.props.onLoadAddons();
    }
    render() {
      const {
        isPlayerOnly,
        onLoadAddons,
        ...props
      } = this.props;
      return (
        <WrappedComponent
          {...props}
        />
      );
    }
  }
  AddonLoaderComponent.propTypes = {
    isPlayerOnly: PropTypes.bool,
    onLoadAddons: PropTypes.func
  };
  AddonLoaderComponent.defaultProps = {
    onLoadAddons: () => {}
  };
  const mapStateToProps = state => ({
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
  });
  const mapDispatchToProps = dispatch => ({});
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddonLoaderComponent);
};

export default TWAddonLoaderHOC;
