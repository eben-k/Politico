/**
 * @description - Checks the request parameters for creating new party are in right format
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 */

const createPartyValidator = (req, res, next) => {
  const {
    name,
  } = req.body;
  req.check('name', 'Political Party name is required').notEmpty();
  req.check('name', 'Party name should be more than 5 characters')
    .isLength({ min: 6 });
  req.check('name', 'Party name should be valid').isAlphanumeric();
  const errors = req.validationErrors();
  const validationErrors = [];
  if (errors) {
    errors.map(err => validationErrors.push(err.msg));
    return res.status(400).json({
      errors: validationErrors,
    });
  }
  let error = false;
  const fieldValues = [name];
  fieldValues.map((fieldValue) => {
    if (fieldValue.trim() === '') {
      error = true;
    }
  });
  if (error) {
    return res.status(400).json({
      message: 'Please fill in all fields',
      error: true,
    });
  }
  req.body.name = name.replace(/\s{2,}/g, ' ').trim();
  return next();
};

export default createPartyValidator;
