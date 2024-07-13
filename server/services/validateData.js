const joi = require("joi");

const schema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "fr", "net"] } }),
  password: joi
    .string()
    .pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@$%^&(){}:;<>,.?/~_+-=|]).{8,}/
    )
});

const articleSchema = joi.object({
  title: joi.string(),
  type: joi.string(),
  warranty: joi.number(),
  price: joi.number(),
})

const validateSchema = (validator) => async (req, res, next) => {
  try {
    await validator.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { schema, articleSchema, validateSchema };
