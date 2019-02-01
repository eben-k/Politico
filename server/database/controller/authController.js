import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY;

const Auth = {
  hashedPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  verifyPassword(hashedPassword, password) {
    return bcrypt.compareSync(password, hashedPassword);
  },
  validEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  createToken(userDetail) {
    const {
      id, email, passportURL, isAdmin,
    } = userDetail;
    const authDetail = {
      id, email, passportURL, isAdmin,
    };
    const token = jwt.sign(
      authDetail, secret, { expiresIn: '10hrs' },
    );
    return token;
  },
};
export default Auth;
