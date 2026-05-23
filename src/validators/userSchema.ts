import * as Joi from "joi";

const userFields = {
    email: Joi.string().email().min(2).max(255).required(),
    nickname: Joi.string().min(2).max(70),
}

export const createUserSchema = Joi.object({
    email: userFields.email.required(),
    nickname: userFields.nickname.required(),
})
