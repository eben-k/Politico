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

/**
  *Create a party
  *@description Adds a new party
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - status code, and data
  */

const addParty = (req, res) => {
  const {
    name,
  } = req.body;
  const id = parties.length + 1;
  const partyDetails = {
    id,
    name,
  };
  parties.push(partyDetails);
  return (
    res.status(201).json({
      status: 201,
      data: [partyDetails],
    })
  );
};

/**
*Delete party
*@description Delete a party by id
*@static
*@param  {Object} req - request
*@param  {object} res - response
*@return {object} - status code and data
*/

const deleteParty = (req, res) => {
  const { partyId } = req.params;
  let found = false;
  let partyIndex;
  parties.map((party, index) => {
    if (party.partyId === Number(partyId)) {
      partyIndex = index;
      found = true;
      return true;
    }
    return false;
  });
  if (found) {
    parties.splice(partyIndex, 1);
    return (res.status(200).json({
      status: 200,
      data: [{ message: 'Party deleted Successfully' }],
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
  addParty,
  deleteParty,
};
