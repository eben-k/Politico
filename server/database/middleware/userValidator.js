
const checkSignup = (req, res, next) => {
  // console.log(req.body, 'body object');
  req.check('firstname', 'First Name is required').notEmpty().isAlpha();
  req.check('lastname', 'Last Name is required').notEmpty().isAlpha();
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email should take form something@something.com').isEmail();
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
  const {
    firstname, lastname, email, passportUrl, phoneNumber, password,
  } = req.body;
  let error = false;
  const fieldValues = [firstname, lastname, email, passportUrl, phoneNumber, password];
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
  req.body.email = email.replace(/\s{2,}/g, '').trim().toLowerCase();
  req.body.password = password.replace(/\s{2,}/g, '').trim().toLowerCase();
  return next();
};

const checkLogin = (req, res, next) => {
  const { email, password } = req.body;
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email should take form something@something.com').isEmail();
  req.check('password', 'Password is required').notEmpty();
  const errors = req.validationErrors();
  const validationErrors = [];
  if (errors) {
    errors.map(err => validationErrors.push(err.msg));
    return res.status(400).json({
      errors: validationErrors,
    });
  }
  req.body.email = email.replace(/\s{2,}/g, '').trim().toLowerCase();
  req.body.password = password.replace(/\s{2,}/g, '').trim().toLowerCase();
  return next();
};

export default {
  checkSignup,
  checkLogin,
};
