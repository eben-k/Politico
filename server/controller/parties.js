import parties from '../models/parties';

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
    data: parties,
  });
};

/**
*Get a party
  *@description Retrieves a party by id
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, data
  */

const getParty = (req, res) => {
  const { partyId } = req.params;
  let found = false;
  let partyDetails;
  parties.map((party) => {
    if (party.partyId === Number(partyId)) {
      partyDetails = party;
      found = true;
      return true;
    }
    return false;
  });
  if (found) {
    return (res.status(200).json({
      status: 200,
      data: [partyDetails],
    }));
  }
  return (res.status(404).json({
    status: 404,
    error: 'This party does not exist',
  }));
};

export default {
  getAllParties,
  getParty,
};
