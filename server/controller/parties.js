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
  const partyDetails = parties.find(party => party.id === Number(partyId));
  if (partyDetails) {
    return (res.status(200).json({
      status: 200,
      data: partyDetails,
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
    hqAddress,
    logoUrl,
    email,
    phone,
  } = req.body;
  const id = parties.length + 1;
  const partyDetails = {
    id,
    name,
    hqAddress,
    logoUrl,
    email,
    phone,
  };
  parties.push(partyDetails);
  return (
    res.status(201).json({
      status: 201,
      data: partyDetails,
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
  const partyIndex = parties.findIndex(party => party.id === Number(partyId));
  if (partyIndex !== -1) {
    parties.splice(partyIndex, 1);
    return (res.status(200).json({
      status: 200,
      data: { message: 'Party deleted Successfully' },
    }));
  }
  return (res.status(404).json({
    status: 404,
    error: 'This party does not exist',
  }));
};

/**
  *Updates Political Party
  *@description Update party by ID
  *@static
  *@param  {Object} req - request
  *@param  {object} res - response
  *@return {object} - party data
  */

const updateParty = (req, res) => {
  const { partyId } = req.params;
  const { name } = req.body;
  const partyIndex = parties.find(party => party.id === Number(partyId));
  if (partyIndex) {
    partyIndex.name = name;
    return (
      res.status(201).json({
        status: 201,
        data: partyIndex,
      })
    );
  }
  return (
    res.status(404).json({
      status: 404,
      error: 'This Party does not exist',
    })
  );
};

export default {
  getAllParties,
  getParty,
  addParty,
  deleteParty,
  updateParty,
};
