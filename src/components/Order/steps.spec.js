import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FirstStep from './first-step'

Enzyme.configure({ adapter: new Adapter() })

const handleChange = jest.fn()

describe('Steps', () => {
    test('renders', () => {
        const wrapperOrder = mount( <FirstStep handleChange={handleChange} /> )
        expect(wrapperOrder.exists()).toBe(true)
    })
})