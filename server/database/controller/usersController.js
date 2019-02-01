import pool from '../models/configDb';
import Auth from './authController';

const createUser = (req, res) => {
  const {
    firstname, lastname, email, phoneNumber, passportUrl, password,
  } = req.body;
  if (!firstname || !lastname || !phoneNumber || !passportUrl || !password) {
    return res.status(400).json({
      status: 400,
      error: 'Please check required fields',
    });
  }
  let userDetail;
  const hashedPassword = Auth.hashedPassword(password);
  pool.query({ text: 'SELECT email from users where email = $1', values: [email] })
    .then((found) => {
      if (!email || !Auth.validEmail(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Please enter valid email address',
        });
      }
      if (found.rowCount === 0) {
        const query = {
          text: 'INSERT INTO users(firstname, lastname, email, phoneNumber, passportUrl, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
          values: [firstname, lastname, email, phoneNumber, passportUrl, hashedPassword],
        };
        pool.query(query).then((user) => {
          userDetail = [user.rows[0]];
          const tokenValue = Auth.createToken(userDetail);

          return res.status(201).json({
            status: 201,
            data: {
              token: tokenValue,
              user: userDetail,
            },
          });
        });
      } else {
        return res.status(409).json({
          status: 409,
          error: 'Email is taken',
        });
      }
    }).catch(err => (res.status(500).json(err)));
};

export default createUser;
