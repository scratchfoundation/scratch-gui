import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash.omit';
import {connect} from 'react-redux';

/**
 * Higher Order Component to give components the ability to react to drag overs
 * and drops of objects stored in the assetDrag redux state.
 *
 * Example: You want to enable MyComponent to receive drops from a drag type
 *    Wrapped = DropAreaHOC([...dragTypes])(
 *      <MyComponent />
 *    )
 *
 * MyComponent now receives 2 new props
 *      containerRef: a ref that must be set on the container element
 *      dragOver: boolean if an asset is being dragged above the component
 *
 * Use the wrapped component:
 *    <Wrapped onDrop={yourDropHandler} />
 *
 * NB: This HOC _only_ works with objects that drag using the assetDrag reducer.
 *     This _does not_ handle drags for blocks coming from the workspace.
 *
 * @param {Array.<string>} dragTypes Types to respond to, from DragConstants
 * @returns {function} The HOC, specialized for those drag types
 */
const DropAreaHOC = function (dragTypes) {
    /**
     * Return the HOC, specialized for the dragTypes
     * @param {React.Component} WrappedComponent component to receive drop behaviors
     * @returns {React.Component} component with drag over/drop behavior
     */
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
                if (this.props.componentRef) {
                    this.props.componentRef(this.ref);
                }
            }
            render () {
                const componentProps = omit(this.props, ['onDrop', 'dragInfo', 'componentRef']);
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
            componentRef: PropTypes.func,
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
