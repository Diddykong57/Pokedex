import * as Joi from "joi";
import { badRequestError } from "../utils/errorUtils";

export function validateSchema<T>(schema: Joi.ObjectSchema<T>, payload: unknown): T {
    const { error, value } = schema.validate(payload, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const details = error.details.map(err => err.message.replace(/"/g, ""));
        throw badRequestError("Validation error", { details });
    }

    return value;
}
