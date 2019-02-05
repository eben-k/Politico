import pool from '../models/configDb';

const castBallot = (req, res) => {
  const {
    createdBy, office, candidate,
  } = req.body;
  const duplicate = {};
  const userQuery = {
    text: 'select * from users where id = $1',
    values: [createdBy],
  };
  pool.query(userQuery)
    .then((user) => {
      if (user.rowCount === 0) {
        duplicate.userNotExist = 'userId does not exist';
      }
    });
  const officeQuery = {
    text: 'select * from offices where id = $1',
    values: [office],
  };
  pool.query(officeQuery)
    .then((officeData) => {
      if (officeData.rowCount === 0) {
        duplicate.officeNotExist = 'officeId does not exist';
      }
    });
  const candidateQuery = {
    text: 'select * from candidates where id = $1',
    values: [candidate],
  };
  pool.query(candidateQuery)
    .then((candidateData) => {
      if (candidateData.rowCount === 0) {
        duplicate.candidateNotExist = 'candidate does not exist';
      }
      if (JSON.stringify(duplicate) !== '{}') {
        return res.status(409)
          .json({
            status: 409,
            error: duplicate,
          });
      }
    });
  const voteQuery = {
    text: 'insert into votes (createdBy, office, candidate) values ($1, $2, $3) returning *',
    values: [createdBy, office, candidate],
  };
  pool.query(voteQuery)
    .then((vote) => {
      if (vote.rowCount > 0) {
        const voter = vote.rows;
        res.status(201)
          .json({
            status: 201,
            data: [{ voter }],
          });
      }
    })
    .catch(error => res.status(500)
      .json({
        status: 500,
        data: [error.message],
      }));
};

const getResult = (req, res) => {
  const { officeId } = req.params;
  const officeQuery = {
    text: 'select * from offices where id = $1',
    values: [officeId],
  };
  pool.query(officeQuery)
    .then((data) => {
      if (data.rowCount === 0) {
        res.status(201)
          .json({
            status: 404,
            error: 'office does not exist, please check your input and try again ',
          });
      }
    });
  const resultQuery = {
    text: 'select office, candidate, count(candidate) as results from votes where votes.office = $1 group by votes.candidate, votes.office',
    values: [officeId],
  };
  pool.query(resultQuery)
    .then((data) => {
      if (data.rowCount !== 0) {
        const result = data.rows[0];
        res.status(200)
          .json({
            status: 200,
            message: 'Election results for this office',
            data: result,
          });
      }
    });
};

export default {
  castBallot,
  getResult,
};
