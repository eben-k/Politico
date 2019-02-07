import pool from '../models/configDb';

/**
    *Get all parties
    *@description Retrieves all the parties from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing parties
    */

const getAllParties = (req, res) => {
  let allParties;
  const query = { text: 'SELECT * FROM parties' };
  pool.query(query).then((parties) => {
    allParties = parties.rows;
    return (res.status(200).json({
      status: 200,
      data: [allParties],
    }));
  }).catch(err => (res.status(500).json(err)));
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
  const query = {
    text: 'SELECT * FROM parties WHERE id = $1',
    values: [partyId],
  };
  let partyDetails;
  pool.query(query).then((party) => {
    if (party.rowCount > 0) {
      partyDetails = party.rows;
      return (res.status(200).json({
        status: 200,
        data: partyDetails,
      })
      );
    }
    return (res.status(404).json({
      status: 404,
      error: 'This party does not exist',
    }));
  }).catch(err => (res.status(500).json(err)));
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
  let partyDetails;
  pool.query({
    text: 'SELECT name FROM parties WHERE LOWER(name) = LOWER($1)',
    values: [name],
  }).then((found) => {
    if (found.rowCount) {
      return res.status(409).json({
        status: 409,
        error: 'This party name already exists',
      });
    }
    const query = {
      text: 'INSERT INTO parties(name, hqAddress, logoUrl, email, phone) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [name,
        hqAddress,
        logoUrl,
        email,
        phone],
    };
    pool.query(query).then((party) => {
      partyDetails = party.rows;
      return (
        res.status(201).json({
          status: 201,
          data: partyDetails,
        })
      );
    }).catch(err => (
      res.status(500).json({
        err,
      })
    ));
  }).catch(err => (
    res.status(500).json({
      err,
    })
  ));
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
  const query = {
    text: 'DELETE FROM parties WHERE id = $1',
    values: [partyId],
  };
  pool.query(query).then((party) => {
    const { rowCount } = party;
    if (rowCount > 0) {
      return (res.status(200).json({
        status: 200,
        data: { message: 'Party deleted Successfully' },
      })
      );
    }
    return (res.status(404).json({
      status: 404,
      error: 'This party does not exist',
    }));
  }).catch(err => (res.status(500).json(err)));
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
  const { name } = req.body;
  const { partyId } = req.params;
  let partyDetails;

  pool.query({ text: 'SELECT id from parties where id = $1', values: [partyId] })
    .then((found) => {
      if (found.rowCount) {
        pool.query({
          text: 'SELECT name FROM parties WHERE LOWER(name) = LOWER($1)',
          values: [name],
        }).then((foundOne) => {
          if (foundOne.rowCount) {
            return res.status(409).json({
              status: 409,
              error: 'This party name already exists',
            });
          }
          const query = {
            text: 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *',
            values: [name, partyId],
          };
          pool.query(query).then((party) => {
            partyDetails = [party.rows[0]];
            return res.status(200).json({
              status: 200,
              data: partyDetails,
            });
          });
        });
      } else {
        return res.status(404).json({
          status: 404,
          error: 'This Party does not exist',
        });
      }
    }).catch(err => (
      res.status(500).json(err)
    ));
};

export default {
  getAllParties,
  getParty,
  addParty,
  deleteParty,
  updateParty,
};
