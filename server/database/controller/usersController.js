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
  // let userDetail;
  const hashedPassword = Auth.hashedPassword(password);
  pool.query({ text: 'SELECT email from users where email = $1', values: [email] })
    .then((found) => {
      if (found.rowCount === 0) {
        const query = {
          text: 'INSERT INTO users(firstname, lastname, email, phoneNumber, passportUrl, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
          values: [firstname, lastname, email, phoneNumber, passportUrl, hashedPassword],
        };
        pool.query(query).then((user) => {
          const userDetail = user.rows[0];
          const authDetail = {
            id: userDetail.id,
            isAdmin: userDetail.isadmin,
          };
          const tokenValue = Auth.createToken(authDetail);

          return res.status(201).json({
            status: 201,
            data: [{
              token: tokenValue,
              user: {
                fullName: `${userDetail.firstname} ${userDetail.lastname}`,
                isAdmin: userDetail.isadmin,
              },
            }],
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

const loginUser = (req, res) => {
  const { email, password } = req.body;
  // let userDetail;
  const hashedPassword = Auth.hashedPassword(password);
  const query = { text: 'SELECT * FROM users Where email = $1', values: [email] };
  pool.query(query).then((user) => {
    if (user.rowCount) {
      const userDetail = user.rows[0];
      // console.log(userDetail);
      if (Auth.verifyPassword(password, userDetail.password)) {
        // const {
        //   id, firstname, lastname, isAdmin,
        // } = userDetail;
        // console.log(userDetail);
        const authDetail = {
          id: userDetail.id,
          isAdmin: userDetail.isadmin,
        };
        // console.log(authDetail);
        if (hashedPassword) {
          const tokenValue = Auth.createToken(authDetail);
          return res.status(200).json({
            status: 200,
            data: {
              token: tokenValue,
              user: {
                fullName: `${userDetail.firstname} ${userDetail.lastname}`,
                isAdmin: userDetail.isadmin,
              },
            },
          });
        }
      }
      return res.status(401).json({
        status: 401,
        error: 'Credentials invalid',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User does not exist',
    });
  }).catch(err => (res.status(500).json(err)));
};


export default {
  createUser,
  loginUser,
};
