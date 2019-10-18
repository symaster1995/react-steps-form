import React from 'react'
import { Form, Select, InputNumber } from 'antd'

class FirstStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { Option } = Select

        const options = this.props.meals && this.props.meals.map(meal => {
            return <Option value={meal.name} key={meal.name}>{meal.name}</Option>
        })

        return (
            <div>

                <Form className='form-step-1' layout='vertical'>
                    <Form.Item label="Please select a meal" validateStatus={this.props.errors ? 'error' : 'success'} help={this.props.errors}>
                        <Select style={{ width: '100%' }} placeholder="Select a meal" defaultValue={this.props.meal} onChange={this.props.handleChange('meal')}>
                            {options}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Please Enter the number of people">
                        <InputNumber min={1} max={10} value={this.props.people} onChange={this.props.handleChange('people')} />
                    </Form.Item>
                </Form>

            </div >
        )
    }
}


export default FirstStep