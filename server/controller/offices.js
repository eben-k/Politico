import offices from '../models/offices';

/**
    *Get all offices
    *@description Retrieves all the offices from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing offices
    */
const getAllOffices = (req, res) => {
  res.status(200).json({
    status: 200,
    data: offices,
  });
};

/**
*Get a political office
  *@description Retrieves an office by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, data
  */

const getOffice = (req, res) => {
  const { officeId } = req.params;
  let found = false;
  let officeDetails;
  offices.map((office) => {
    if (office.officeId === Number(officeId)) {
      officeDetails = office;
      found = true;
      return true;
    }
    return false;
  });
  if (found) {
    return (res.status(200).json({
      status: 200,
      data: [officeDetails],
    }));
  }
  return (res.status(404).json({
    status: 404,
    error: 'This office does not exist',
  }));
};

export default {
  getAllOffices,
  getOffice,
};
