import App from '../../App';
import React from 'react';
import { shallow } from 'enzyme';

it('should test render component', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
});
