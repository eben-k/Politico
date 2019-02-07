import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

const Auth = {
  hashedPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },
  validEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  createToken(userDetail) {
    // const {
    //   id, email, isAdmin,
    // } = userDetail;
    // const authDetail = {
    //   id, email, isAdmin,
    // };
    const token = jwt.sign(
      userDetail, secret, { expiresIn: '10hrs' },
    );
    return token;
  },
};
export default Auth;
