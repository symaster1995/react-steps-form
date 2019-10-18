import React from 'react'
import { Form, Select } from 'antd'

class SecondStep extends React.Component {
    render() {

        const { Option } = Select

        const options = this.props.restaurants && this.props.restaurants.map(restaurant => {
            return <Option value={restaurant.name} key={restaurant.name}>{restaurant.name}</Option>
        })

        return (
            <div>

                <Form className='form-step-2' layout='vertical' >
                    <Form.Item label="Please select a restaurant" validateStatus={this.props.errors ? 'error' : 'success'} help={this.props.errors}>
                        <Select style={{ width: '100%' }} defaultValue={this.props.restaurant} placeholder="Select a restaurant" onChange={this.props.handleChange('restaurant')}>
                            {options}
                        </Select>
                    </Form.Item>

                </Form>
            </div>
        )
    }
}


export default SecondStep