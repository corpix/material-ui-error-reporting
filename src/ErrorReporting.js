import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { red900, grey50 } from 'material-ui/styles/colors';


class ErrorReporting extends Component {

    static defaultProps = {
        open: false,
        action: '',
        error: null,
        autoHideDuration: 10000,
        getMessage: (props) => props.error ? props.action + ': ' + props.error.toString() : '',
        style: {
            backgroundColor: red900,
            color: grey50
        },
        contentStyle: {
            display: 'block',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
    }

    exclusiveProps = [
        'getMessage',
        'error',
        'action'
    ]

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
    }

    render() {
        return (
            <Snackbar
              open={this.props.open}
              message={this.props.getMessage(this.props)}
              autoHideDuration={this.props.autoHideDuration}
              style={this.props.style}
              contentStyle={this.props.style}
              bodyStyle={this.props.style}
              {...this.getSnackbarProps()}
              />
        );
    }
}

function mapStoreToProps(state) {
    const { action, error } = state.errors;
    return {
        open: error !== null,
        action: action,
        error: error
    };
}

export default connect(mapStoreToProps)(ErrorReporting);
