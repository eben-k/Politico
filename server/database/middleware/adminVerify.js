/**
 * @description - Checks if the authenticated user is admin
 * @param  {Object} req - request
 * @param  {object} res - response
 * @param {Object} next - Call back function
 * @return {object} - status code and error message or next()
 */

const verifyAdmin = (req, res, next) => {
  const { isAdmin } = req.authData;
  if (isAdmin === false) {
    return (res.status(403).json({
      status: 403,
      error: 'Access denied!',
    }));
  }
  return next();
};
export default verifyAdmin;
