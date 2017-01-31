// -*- mode: rjsx -*-
import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import {red900, grey50} from 'material-ui/styles/colors';


class ErrorReporting extends Component {

    static defaultProps = {
        open: false,
        action: '',
        error: null,
        autoHideDuration: 10000,
        getMessage: (props) => props.error
            ? (
                (props.action ? props.action + ': ' : '')
                    + String(props.error)
            ) : '',
        style: {
            backgroundColor: red900,
            color: grey50
        },
        contentStyle: {
            display: 'block',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        },
        onError: (error, action = '') => undefined,
        onClose: (reason, error, action = '') => undefined
    };

    static propTypes = {
        open: React.PropTypes.bool,
        action: React.PropTypes.string,
        error: React.PropTypes.instanceOf(Error),
        autoHideDuration: React.PropTypes.number,
        getMessage: React.PropTypes.func,
        style: React.PropTypes.object,
        contentStyle: React.PropTypes.object,
        onError: React.PropTypes.func,
        onClose: React.PropTypes.func
    };

    exclusiveProps = [
        'getMessage',
        'error',
        'action',
        'onError',
        'onClose'
    ];

    constructor(props) {
        super();

        if (props.error) {
            props.onError(
                props.error,
                props.action
            );
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            nextProps.onError(
                nextProps.error,
                nextProps.action
            );
        }
    };

    getSnackbarProps() {
        return Object
            .keys(this.props)
            .filter(
                (name) => this.exclusiveProps.indexOf(name) === -1
            )
            .reduce(
                (acc, name) => {
                    acc[name] = this.props[name];
                    return acc;
                },
                {}
            );
    };

    onClose = (reason) => this.props.onClose(
        reason,
        this.props.error,
        this.props.action
    );

    render() {
        return (
            <Snackbar
              open={this.props.open}
              message={this.props.getMessage(this.props)}
              autoHideDuration={this.props.autoHideDuration}
              style={this.props.style}
              contentStyle={this.props.style}
              bodyStyle={this.props.style}
              onRequestClose={this.onClose}
              {...this.getSnackbarProps()}
              />
        );
    };
}

export default ErrorReporting;
