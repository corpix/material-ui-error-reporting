material-ui-error-reporting
---------------------------

[![Build Status](https://travis-ci.org/corpix/material-ui-error-reporting.svg?branch=master)](https://travis-ci.org/corpix/material-ui-error-reporting)

Simple error reporting component for your material-ui application.

![Screenshot](screenshot.png)

# Installation

``` shell
yarn add material-ui-error-reporting
```

Or with npm

```shell
npm i --save material-ui-error-reporting
```

# Usage example

Component:

``` javascript
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorReporting from 'material-ui-error-reporting';

import {connect} from 'react-redux';

// ...

class App extends Component {
    static defaultProps = {
        error: {
            action: '',
            error: null
        }
    };

    static propTypes = {
        error: PropTypes.object,
        dispatch: PropTypes.func
    };

    render() {
        return (
            <div>
                <ErrorReporting
                    open={this.props.error.error !== null}
                    action={this.props.error.action}
                    error={this.props.error.error}
                    />
            </div>
        );
    }
}

function mapStoreToProps(state) {
    return {
        error: state.errors
    };
}

export default connect(mapStoreToProps)(App);
```

Reducer:

``` javascript
import {ERROR_ADD} from 'store/action';

import {get} from 'lodash';

let initialState = {
    action: '',
    error: null
};

export const errors = (state = initialState, action) => {
    switch (action.type) {
    case ERROR_ADD:
        return {
            ...state,
            action: get(action.payload, 'action.type', ''),
            error: action.payload.error
        };
    default:
        return state;
    }
};
```

Action:

``` javascript
const id = (name) => '@@app/' + name;

export const REQUESTING = id('REQUESTING');
export const RECEIVED = id('RECEIVED');
export const FAILED = id('FAILED');
export const ERROR_ADD = id('ERROR_ADD');

const newAction = (type, payload) => ({type, payload});

export const requesting = (payload) => newAction(REQUESTING, payload);
export const received = (payload) => newAction(RECEIVED, payload);
export const failed = (payload) => newAction(FAILED, payload);

export const errorAdd = (error, action) => newAction(ERROR_ADD, {error, action});
```

Some provider pushing an error:

``` javascript
const url = '...';

export const provide = (criteria) => (dispatch) => {
    dispatch(requesting());
    return request(url + '/' + criteria)
        .then((data) => dispatch(received(data)))
        .catch((err) => {
                dispatch(failed(err));
                dispatch(errorAdd(err, requesting()));
            }
        );
};
```

# Properties

> For snackbar props please see [material-ui docs](http://www.material-ui.com/#/components/snackbar).

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| open | `boolean` | `false` | State of the snackbar, opened or closed. |
| action | `string` | `''` | Name of the action where error happened. |
| error | `string|Error` | `null` | Actual error, it should have `toString()` method. |
| autoHideDuration | `number` | `10000` | Snackbar prop. |
| getMessage | `function` | `(props) => props.action + ': ' + props.error` | Pure function which will receive `props` as first argument and must return a `string` which should contain error message. Default implementation is a concatenation of the action with error delimited by `: `. |
| style | `object` | `{backgroundColor: red900, color: grey50}` | Object with the styles for `style`, `contentStyle` and `bodyStyle` of snackbar(will receive a copy into each of this props). |
| onError | `function` | `(error, action = '') => undefined` | Will be called when component props receives non null `error`. |
| onClose | `function` | `(reason, error, action = '') => undefined` | Will be called when error message closes. |

# License

[MIT](/LICENSE)
