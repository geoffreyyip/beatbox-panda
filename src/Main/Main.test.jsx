import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Main from './Main';

describe('<Main /> smoke test', function() {
  it('should render at runtime', function() {
    shallow(<Main />);
  });
});
