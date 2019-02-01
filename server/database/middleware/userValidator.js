
const checkSignup = (req, res, next) => {
  req.check('firstname', 'First Name is required').notEmpty().isAlpha();
  req.check('lastname', 'Last Name is required').notEmpty().isAlpha();
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email is not valid').isEmail();
  req.check('passportUrl', 'Passport URL is required').notEmpty();
  req.check('phoneNumber', 'Position is required').notEmpty().isNumeric();
  req.check('password', 'Password is required').notEmpty();
  req.check('password', 'Minimum password length is 6 characters')
    .isLength({ min: 6 });
  const errors = req.validationErrors();
  const validationErrors = [];
  if (errors) {
    errors.map(err => validationErrors.push(err.msg));
    return res.status(400).json({
      errors: validationErrors,
    });
  }
  const {
    firstname, lastname, email, phoneNumber, passportUrl, password,
  } = req.body;
  let error = false;
  const fieldValues = [firstname, lastname, email, phoneNumber, passportUrl, password];
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
  return next();
};

export default checkSignup;
