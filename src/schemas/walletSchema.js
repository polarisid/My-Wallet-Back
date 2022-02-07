import joi from 'joi';

const walletSchema = joi.object({
    date: joi.string().required(),
    name: joi.string().required(),
    value: joi.number().positive().required(),
    type: joi.string().valid('output','input')
});

export default walletSchema;