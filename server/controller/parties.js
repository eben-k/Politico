import partiesList from '../models/parties';

/**
    *Get all parties
    *@description Retrieves all the parties from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing parties
    */
const getAllParties = (req, res) => {
  res.status(200).json({
    status: 200,
    data: partiesList,
  });
};
export default getAllParties;
