import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import pool from '../models/configDb';


dotenv.config();

const secret = process.env.SECRET_KEY;

/**
 * @description - Checks if the authenticated user is admin
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 */
const verifyAdmin = (req, res, next) => {
  const headerBearer = req.headers.authorization;
  jwt.verify(headerBearer, secret, (err, authData) => {
    req.authData = authData;
    // const admin = process.env.ADMIN_EMAIL;
    // console.log(authData.isAdmin);
    if (!authData.isAdmin) {
      return (res.status(403).json({
        status: 403,
        error: 'Access denied! Unauthorized action',
      }));
    }

    return next();
  });
};
// const verifyAdmin = async (req, res, next) => {
//   // const headerBearer = req.headers.authorization;
//   let userDetails;
//   const query = { text: 'SELECT * FROM users WHERE id = $1' };
//   await pool.query(query).then((user) => {
//     if (user.rowCount > 0) {
//       userDetails = user.rows;
//     }
//     console.log(userDetails);
//     if (userDetails.isAdmin === true) {
//       return next();
//     }
//     return res.status(403).send({
//       status: 403,
//       error: 'Access denied! Unauthorized action',
//     });
//   });
// };
export default verifyAdmin;
