
const checkSignup = (req, res, next) => {
  req.check('firstname', 'First Name is required').notEmpty().isAlpha();
  req.check('lastname', 'Last Name is required').notEmpty().isAlpha();
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email is not valid').isEmail();
  req.check('passportUrl', 'Passport URL is required').notEmpty();
  req.check('phoneNumber', 'Phone number is required').notEmpty().isNumeric();
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
  return next();
};

const checkLogin = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Valid email required').isEmail();
  req.check('password', 'Password is required').notEmpty();
  const errors = req.validationErrors();
  const validationErrors = [];
  if (errors) {
    errors.map(err => validationErrors.push(err.msg));
    return res.status(400).json({
      errors: validationErrors,
    });
  }
  return next();
};

export default {
  checkSignup,
  checkLogin,
};
