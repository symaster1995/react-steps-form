import React from 'react'
import { Row, Col } from 'antd'

class Review extends React.Component {

    render() {

        const { meal, people, restaurant, dishes } = this.props.order

        console.log(dishes)
        return (
            <div className='review'>
                <Row gutter={[24, 40]}>
                    <Col span={6} offset={6}>Meal</Col>
                    <Col span={6} offset={2}>{meal}</Col>
                </Row>
                <Row gutter={[24, 40]}>
                    <Col span={6} offset={6}>No. of people</Col>
                    <Col span={6} offset={2}>{people}</Col>
                </Row>
                <Row gutter={[24, 40]}>
                    <Col span={6} offset={6}>Restaurant</Col>
                    <Col span={6} offset={2}>{restaurant}</Col>
                </Row>
                <Row gutter={[24, 40]}>
                    <Col span={6} offset={6}>Dishes</Col>
                    <Col span={6} offset={2}>
                        {dishes.map(dish => (
                            <div key={dish.id}>{dish.servings} - {dish.dish}</div>
                        ))}
                    </Col>
                </Row>

            </div>
        )
    }
}


export default Review