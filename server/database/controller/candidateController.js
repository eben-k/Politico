import pool from '../models/configDb';

const createCandidate = (req, res) => {
  const {
    office, userId, party,
  } = req.body;
  const twinValue = {};
  const userQuery = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [userId],
  };
  const officeQuery = {
    text: 'SELECT * FROM offices WHERE id = $1',
    values: [office],
  };
  const partyQuery = {
    text: 'SELECT * FROM parties WHERE id = $1',
    values: [party],
  };
  pool.query(userQuery)
    .then((details) => {
      if (details.rowCount === 0) {
        twinValue.userNotExist = 'userId does not exist';
      }
    });

  pool.query(officeQuery)
    .then((details) => {
      if (details.rowCount === 0) {
        twinValue.officeNotExist = 'officeId does not exist';
      }
    });
  pool.query(partyQuery)
    .then((details) => {
      if (details.rowCount === 0) {
        twinValue.partyNotExist = 'partyId does not exist';
      }
    });
  const query = {
    text: 'INSERT INTO candidates (userId, office, party) VALUES ($1, $2, $3) RETURNING *',
    values: [office, userId, party],
  };
  pool.query(query)
    .then((details) => {
      if (details.rowCount !== 0) {
        const candidate = details.rows[0];
        res.status(201)
          .json({
            status: 201,
            data: [{ candidate }],
          });
      }
    })
    .catch(error => res.status(400)
      .json({
        status: 400,
        error: [error.message],
      }));
};
export default createCandidate;
