/**
* @description - Checks the request parameters for creating new political office are in right format
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 */

const createOfficeValidator = (req, res, next) => {
  const {
    type,
    name,
  } = req.body;
  req.check('type', 'Political Office type is required').notEmpty();
  req.check('type', 'Office type should be more than 4 characters')
    .isLength({ min: 5 });
  req.check('type', 'Office type should be valid').isAlpha();
  req.check('name', 'Political Office name is required').notEmpty();
  req.check('name', 'Office name should be more than 4 characters')
    .isLength({ min: 5 });
  req.check('name', 'Office name should be valid').isAlpha();
  const errors = req.validationErrors();
  const validationErrors = [];
  if (errors) {
    errors.map(err => validationErrors.push(err.msg));
    return res.status(400).json({
      errors: validationErrors,
    });
  }
  let error = false;
  const fieldValues = [type, name];
  fieldValues.map((fieldValue) => {
    if (fieldValue.trim() === '') {
      error = true;
    }
  });
  if (error) {
    return res.status(400).json({
      status: 400,
      error: 'Please fill in all fields',
    });
  }
  req.body.type = type.replace(/\s{2,}/g, ' ').trim();
  req.body.name = name.replace(/\s{2,}/g, ' ').trim();
  return next();
};

export default createOfficeValidator;
