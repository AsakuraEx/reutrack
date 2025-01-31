const Ajv = require("ajv")
const AjvErrors = require("ajv-errors");
const ajv = new Ajv({allErrors: true})
AjvErrors(ajv);

function validate(schema) {
    return (req, res, next) => {
        const validSchema = ajv.compile(schema);
        const valid = validSchema(req.body); 

        if (!valid) {
            return res.status(400).json({
                errors: validSchema.errors
            });
        }
        next();
    };
}
module.exports= validate