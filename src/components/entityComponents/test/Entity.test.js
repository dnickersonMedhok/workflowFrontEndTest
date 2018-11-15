import React from 'react';
import { shallow, mount, render } from 'enzyme';
import EntityDesigner from '../EntityDesigner';

describe('EntityDesigner Component', () => {

    it('should render without throwing an error', () => {
        expect(shallow(<EntityDesigner />).find('Form').exists()).toBe(true)
      });

      it('renders an entity name', () => {
        expect(shallow(<EntityDesigner />).find('#entityName').length).toEqual(1)
       });
});

describe('Email input', () => {

    it('should respond to change event and change the state of the EntityDesigner Component', () => {
        const wrapper = shallow(<EntityDesigner />);
        wrapper.find('#entityName').simulate('change', {target: {name: 'entityName', value: 'newEntityName'}});
        
       expect(wrapper.state('entityName')).toEqual('newEntityName');

    });
});