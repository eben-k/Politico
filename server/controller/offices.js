import officesModel from '../models/offices';

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
    message: 'Success, Government Offices: ',
    officesModel,
    error: false,
  });
};
export default getAllOffices;
