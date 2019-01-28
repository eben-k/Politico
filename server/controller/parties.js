import partiesModel from '../models/parties';

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
    message: 'Success, Available Parties: ',
    partiesModel,
    error: false,
  });
};
export default getAllParties;
