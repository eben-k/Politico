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
  const officeDetails = offices.find(office => office.id === Number(officeId));
  if (officeDetails) {
    return (res.status(200).json({
      status: 200,
      data: officeDetails,
    }));
  }
  return (res.status(404).json({
    status: 404,
    error: 'This office does not exist',
  }));
};

/**
  *Create a political office
  *@description Adds a new political office
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, and data
  */

const addOffice = (req, res) => {
  const {
    type,
    name,
  } = req.body;
  const id = offices.length + 1;
  const officeDetails = {
    id,
    type,
    name,
  };
  offices.push(officeDetails);
  return (
    res.status(201).json({
      status: 201,
      data: officeDetails,
    })
  );
};

export default {
  getAllOffices,
  getOffice,
  addOffice,
};
