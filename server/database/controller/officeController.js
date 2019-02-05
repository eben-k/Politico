import pool from '../models/configDb';

/**
    *Get all offices
    *@description Retrieves all the offices from the data source
    *@static
    *@param  {Object} req - request
    *@param  {object} res - response
    *@return {object} - status code, message and all existing offices
    */

const getAllOffices = (req, res) => {
  let allOffices;
  const query = { text: 'SELECT * FROM offices' };
  pool.query(query).then((offices) => {
    allOffices = offices.rows;
    return (res.status(200).json({
      status: 200,
      data: [allOffices],
    }));
  }).catch(err => (res.status(500).json(err)));
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
  const query = {
    text: 'SELECT * FROM offices WHERE id = $1',
    values: [officeId],
  };
  let officeDetails;
  pool.query(query).then((office) => {
    if (office.rowCount > 0) {
      officeDetails = office.rows;
      return (res.status(200).json({
        status: 200,
        data: officeDetails,
      })
      );
    }
    return (res.status(404).json({
      status: 404,
      error: 'This office does not exist',
    }));
  }).catch(err => (res.status(500).json(err)));
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
  let officeDetails;
  const query = {
    text: 'INSERT INTO offices(type, name) VALUES($1, $2) RETURNING *',
    values: [type,
      name],
  };
  pool.query(query).then((office) => {
    officeDetails = office.rows;
    return (
      res.status(201).json({
        status: 201,
        data: officeDetails,
      })
    );
  }).catch(err => (
    res.status(500).json({
      err,
    })
  ));
};

export default {
  getAllOffices,
  getOffice,
  addOffice,
};
