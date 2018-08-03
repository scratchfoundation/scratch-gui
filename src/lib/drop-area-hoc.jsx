import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash.omit';
import {connect} from 'react-redux';

const DropAreaHOC = function (dragTypes) {
    return function (WrappedComponent) {
        class DropAreaWrapper extends React.Component {
            constructor (props) {
                super(props);
                bindAll(this, [
                    'setRef'
                ]);

                this.state = {
                    dragOver: false
                };

                this.ref = null;
                this.containerBox = null;
            }

            componentWillReceiveProps (newProps) {
                // If `dragging` becomes true, record the drop area rectangle
                if (newProps.dragInfo.dragging && !this.props.dragInfo.dragging) {
                    this.dropAreaRect = this.ref && this.ref.getBoundingClientRect();
                // If `dragging` becomes false, call the drop handler
                } else if (!newProps.dragInfo.dragging && this.props.dragInfo.dragging && this.state.dragOver) {
                    this.props.onDrop(this.props.dragInfo);
                    this.setState({dragOver: false});
                }

                // If a drag is in progress (currentOffset) and it matches the relevant drag types,
                // test if the drag is within the drop area rect and set the state accordingly.
                if (this.dropAreaRect && newProps.dragInfo.currentOffset &&
                    dragTypes.includes(newProps.dragInfo.dragType)) {
                    const {x, y} = newProps.dragInfo.currentOffset;
                    const {top, right, bottom, left} = this.dropAreaRect;
                    if (x > left && x < right && y > top && y < bottom) {
                        this.setState({dragOver: true});
                    } else {
                        this.setState({dragOver: false});
                    }
                }
            }
            setRef (el) {
                this.ref = el;
            }
            render () {
                const componentProps = omit(this.props, ['onDrop', 'dragInfo']);
                return (
                    <WrappedComponent
                        containerRef={this.setRef}
                        dragOver={this.state.dragOver}
                        {...componentProps}
                    />
                );
            }
        }

        DropAreaWrapper.propTypes = {
            dragInfo: PropTypes.shape({
                currentOffset: PropTypes.shape({
                    x: PropTypes.number,
                    y: PropTypes.number
                }),
                dragType: PropTypes.string,
                dragging: PropTypes.bool,
                index: PropTypes.number
            }),
            onDrop: PropTypes.func
        };

        const mapStateToProps = state => ({
            dragInfo: state.scratchGui.assetDrag
        });

        const mapDispatchToProps = () => ({});

        return connect(
            mapStateToProps,
            mapDispatchToProps
        )(DropAreaWrapper);
    };
};

export default DropAreaHOC;
