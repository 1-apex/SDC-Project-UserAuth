const signupSchema = require('../validators/auth-validators');

const validate = async (req, res, next) => {
    try {
        const validatedData = await signupSchema.parseAsync(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        res.status(400).json({message:"Error in validating data."});
    }
}

module.exports = validate;