import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY;

/**
 * @description - Checks if the user has been authenticated
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 * @static
 */

const authenticate = (req, res, next) => {
  const headerBearer = req.headers.authorization;
  if (!headerBearer) {
    return res.status(401).json({
      status: 401,
      error: 'Please sign in',
    });
  }
  jwt.verify(headerBearer, secret, (err, authData) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: 'Please sign in',
      });
    }
    req.authData = authData;
    return next();
  });
};
export default authenticate;
