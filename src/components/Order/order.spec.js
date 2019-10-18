import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Order } from './order'

Enzyme.configure({ adapter: new Adapter() })

describe('Order', () => {
    test('renders', () => {
        const wrapperOrder = shallow( <Option /> )
        expect(wrapperOrder.exists()).toBe(true)
    })
})