import React from 'react'
import { Col, Row, Icon, InputNumber, Select, Form } from 'antd'


class ThirdStep extends React.Component {

    render() {

        const { Option } = Select

        const selected = this.props.dataDishes.map(dish =>{
            return dish.dish
        })

        const options = this.props.dishes && this.props.dishes.filter(dish => {
            return !selected.includes(dish.dish)
        }).map(dish => {
            return <Option value={dish.dish} key={dish.id}>{dish.dish}</Option>
        })

        const dishes = this.props.dataDishes && this.props.dataDishes.map((dish, index) => {

            const remove = this.props.dataDishes.length > 1 ? <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.props.remove(dish.id)} /> : ''

            const error = this.props.errors.find(error => error.id == dish.id)

            console.log(error, 'error')

            return (
                <div key={dish.id} style={{ marginTop: '30px' }}>

                    <Row gutter={[8, 24]}>
                        <Col span={8} offset={6}>
                            <Form.Item validateStatus={error ? 'error' : 'success'} help={error ? error.message : ''}>
                                <Select style={{ width: '100%' }} defaultValue={dish.dish} placeholder='Select dish' onChange={this.props.handleChange('dish', dish.id)}
                                    validateStatus={this.props.errors ? 'error' : 'success'}>
                                    {options}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4} offset={2}>
                            <Form.Item>
                                <InputNumber min={1} value={dish.servings} onChange={this.props.handleChange('servings', dish.id)} />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Form.Item>
                                {remove}
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            )
        })

        return (

            <div className="form-step-3">
                <Row>
                    <Col span={8} offset={6}>Please Select dish</Col>
                    <Col span={4} offset={2}>Please Select serving</Col>
                </Row>


                {dishes}


                <Row gutter={[8, 24]}>
                    <Col span={6} offset={6}>
                        <Icon type="plus-circle" theme="filled" onClick={this.props.add} />
                    </Col>
                </Row>
            </div>
        );
    }
}


export default ThirdStep