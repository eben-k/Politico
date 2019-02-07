const idValidator = (req, res, next) => {
  const { partyId, officeId } = req.params;
  const validId = /^[0-9]+$/;
  const checkParam = (param) => {
    if (!param.match(validId)) {
      return res.status(400).json({
        status: 400,
        error: 'ID can only be a number',
      });
    }
    return next();
  };
  if (partyId) checkParam(partyId);
  if (officeId) checkParam(officeId);
};

export default idValidator;
