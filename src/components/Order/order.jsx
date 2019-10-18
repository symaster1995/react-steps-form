import React from 'react'
import { Steps, Button, message } from 'antd'
import FirstStep from './first-step'
import SecondStep from './second-step'
import ThirdStep from './third-step'
import Review from './review'
import axios from 'axios'
import uuid from 'uuid'
import OrderValidation from '../../util/validator/order.schema'

export class Order extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            steps: [
                {
                    id: 1,
                    title: 'Step 1',
                },
                {
                    id: 2,
                    title: 'Step 2',
                },
                {
                    id: 3,
                    title: 'Step 3',
                },
                {
                    id: 4,
                    title: 'Review',
                }
            ],
            current: 0,
            data: {
                meal: '',
                people: 1,
                restaurant: '',
                dishes: [{
                    id: uuid(),
                    dish: '',
                    servings: 1,
                }]
            },

            errors: {},
            dishesErrors: [],
            dishesList: []
        }
    }

    componentDidMount = () => {

        axios.get('./mock_data/data.json') //get data
            .then(result => {

                this.setState(state => ({ //set data in state
                    ...state,
                    dishesList: result.data.dishes
                }))

            })
            .catch(error => {
                console.log(error, 'axios error')
            })
    }

    handleChange = (input, id) => value => {

        if (id) {
            const dishesChange = this.state.data.dishes.map(dish => {
                if (dish.id == id) {
                    return {
                        ...dish,
                        [input]: value
                    }
                }

                return dish
            })

            const dishesErrors = this.state.dishesErrors.filter(dish => dish.id !== id)

            this.setState(state => ({
                ...state,
                data: {
                    ...state.data,
                    dishes: dishesChange,
                },
                dishesErrors: dishesErrors
            }))

        } else if (input == 'restaurant') {
            this.setState(state => ({
                ...state,
                data: {
                    ...state.data,
                    [input]: value,
                    dishes: [{
                        id: uuid(),
                        dish: '',
                        servings: 1,
                    }]
                },
                errors: {}
            }))
        } else {

            this.setState(state => ({
                ...state,
                data: {
                    ...state.data,
                    [input]: value
                },
                errors: {}
            }))
        }

    }

    next = () => {

        const { error } = OrderValidation(this.state.data, this.state.current + 1)

        if (error && this.state.current + 1 == 3) {
            this.setState(state => ({
                ...state,
                dishesErrors: error
            }))

        } else if (error) {

            this.setState(state => ({
                ...state,
                errors: {
                    ...state.errors,
                    [error.details[0].context.label]: error.details[0].message
                }
            }))

        } else {

            this.setState(state => ({
                ...state,
                current: this.state.current + 1,
                errors: {},
                dishesErrors: []
            }))
        }
    }

    prev = () => {

        this.setState({
            current: this.state.current - 1
        })
    }

    remove = id => {

        this.setState(state => ({
            ...state,
            data: {
                ...state.data,
                dishes: state.data.dishes.filter(dish => dish.id !== id)
            }
        }))
    }

    add = () => {

        this.setState(state => ({
            ...state,
            data: {
                ...state.data,
                dishes: state.data.dishes.concat(
                    [
                        {
                            id: uuid(),
                            dish: '',
                            servings: 1
                        }
                    ]
                )
            }
        }))
    }

    submit = () => {
        message.success('Processing complete!')
    }

    stepButtons = () => {

        const btnNext = this.state.current < this.state.steps.length - 1 ? <Button type='primary' onClick={this.next}>Next </Button> : ''
        const btnPrev = this.state.current > 0 ? <Button className='btn-prev' onClick={this.prev}>Previous</Button> : ''
        const btnDone = this.state.current === this.state.steps.length - 1 ? <Button type='primary' onClick={this.submit}>Done</Button> : ''
        return (
            <div className='steps-action'>
                {btnPrev}
                {btnNext}
                {btnDone}
            </div>
        )
    }

    stepContent = () => {

        switch (this.state.current + 1) {
            case 1:
                const meals = [
                    { name: 'breakfast' },
                    { name: 'lunch' },
                    { name: 'dinner' }
                ]

                return <FirstStep meals={meals} meal={this.state.data.meal} people={this.state.data.people} handleChange={this.handleChange} errors={this.state.errors.meal} />
            case 2:

                var lookup = new Set()
                var filtered = this.state.dishesList.filter(dish => { //filter by data in first step and remove duplicates
                    return dish.availableMeals.includes(this.state.data.meal) && !lookup.has(dish['restaurant']) && lookup.add(dish['restaurant'])
                }).map(dish => { //map to only return name
                    return {
                        name: dish.restaurant
                    }
                })

                return <SecondStep restaurants={filtered} restaurant={this.state.data.restaurant} handleChange={this.handleChange} errors={this.state.errors.restaurant} />
            case 3:

                var lookup = new Set()
                var filtered = this.state.dishesList.filter(dish => { //filter by data in second step
                    return dish.restaurant == this.state.data.restaurant && !lookup.has(dish['name']) && lookup.add(dish['name'])
                }).map(dish => {
                    return {
                        id: dish.id,
                        dish: dish.name
                    }
                })

                return <ThirdStep dishes={filtered} dataDishes={this.state.data.dishes} add={this.add} remove={this.remove} handleChange={this.handleChange} errors={this.state.dishesErrors} />

            case 4:

                return <Review order={this.state.data} />

            default:
                break
        }
    }
    render() {

        const { Step } = Steps

        return (
            <div className='step-box'>
                <Steps current={this.state.current}>
                    {this.state.steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {this.stepContent()}
                </div>
                {this.stepButtons()}
            </div>
        )
    }
}