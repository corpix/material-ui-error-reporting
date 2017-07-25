// -*- mode: rjsx -*-
import React from 'react';

import {mount} from 'enzyme';
import {assert} from 'chai';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ErrorReporting from './index';


const mountWithTheme = (node) => mount(
    node,
    {
        context: {muiTheme: getMuiTheme()},
        childContextTypes: {muiTheme: PropTypes.object}
    }
);

describe('ErrorReporting', () => {
    const newErrorReporting = (props = {}) => mountWithTheme(
        <ErrorReporting {...props}/>
    );

    it(
        'always renders some divs',
        () => {
            const nodes = newErrorReporting({
                open: true,
                action: 'hello',
                error: new Error('hello')
            }).find('div');
            assert.equal(nodes.length, 3);
        }
    );
});
