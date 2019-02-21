import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import styles from './loader.css';
import PropTypes from 'prop-types';

const mainMessage = (
    <FormattedMessage
        defaultMessage="Bootstrapping"
        description="Main loading message"
        id="gui.bootstapLoader.headline"
    />
);

class LoaderComponent extends React.Component {
    render () {
        return (
            <div
                className={classNames(styles.background, {
                    [styles.fullscreen]: this.props.isFullScreen
                })}
                dir={this.props.dir}
            >
                <div className={styles.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    isFullScreen: PropTypes.bool
};
LoaderComponent.defaultProps = {
    isFullScreen: false
};

export default LoaderComponent;
