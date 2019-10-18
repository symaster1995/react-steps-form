import Joi from 'joi-browser'

const OrderValidation = (data, step) => {

    switch (step) {
        case 1:

            var data = {
                meal: data.meal
            }

            var schema = Joi.object().keys({
                meal: Joi.string().required(),
            })
            break
        case 2:

            var data = {
                restaurant: data.restaurant
            }
            var schema = Joi.object().keys({
                restaurant: Joi.string().required()
            })
            break
        case 3:

            const errors = data.dishes.map(dish => {
                var schema = Joi.object().keys({ dish: Joi.string().required() })
                var input = { dish: dish.dish }
                const { error } = Joi.validate(input, schema, { abortEarly: false })

                if (error) {
                    return {
                        id: dish.id,
                        message: error.details[0].message
                    }
                }
            }).filter(dish => dish)

            return errors.length > 0 ? { error: errors } : { error: null }

        default:

            break
    }

    return Joi.validate(data, schema, { abortEarly: false })
}

export default OrderValidation