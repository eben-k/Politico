import pool from '../models/configDb';

const castBallot = (req, res) => {
  const {
    office, candidate,
  } = req.body;
  const user = req.authData.id;
  const twinValue = {};
  // const userQuery = {
  //   text: 'select * from users where id = $1',
  //   values: [createdBy],
  // };
  // pool.query(userQuery)
  //   .then((user) => {
  //     if (user.rowCount === 0) {
  //       twinValue.userNotExist = 'userId does not exist';
  //     }
  //   });
  const officeQuery = {
    text: 'select * from offices where id = $1',
    values: [office],
  };
  pool.query(officeQuery)
    .then((officeData) => {
      if (officeData.rowCount === 0) {
        twinValue.officeNotExist = 'officeId does not exist';
      }
    });
  const candidateQuery = {
    text: 'select * from candidates where id = $1',
    values: [candidate],
  };
  pool.query(candidateQuery)
    .then((candidateData) => {
      if (candidateData.rowCount === 0) {
        twinValue.candidateNotExist = 'candidate does not exist';
      }
    });
  const doubleVoteQuery = {
    text: 'SELECT * FROM votes WHERE office = $1 AND candidate = $2',
    values: [office, candidate],
  };
  pool.query(doubleVoteQuery)
    .then((voteData) => {
      if (voteData.rowCount > 0) {
        twinValue.voteNotExist = 'You cannot vote more than once for same candidate and office!';
      }
      if (JSON.stringify(twinValue) !== '{}') {
        return res.status(409)
          .json({
            status: 409,
            error: twinValue,
          });
      }
    });
  const voteQuery = {
    text: 'insert into votes (createdBy, office, candidate) values ($1, $2, $3) returning *',
    values: [user, office, candidate],
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
    .catch(error => res.status(400)
      .json({
        status: 400,
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
            error: 'office does not exist, please check your input',
          });
      }
    });
  const resultQuery = {
    text: 'select office, candidate, count(candidate) as results from votes where office = $1 group by candidate, office',
    values: [officeId],
  };
  pool.query(resultQuery)
    .then((data) => {
      if (data.rowCount > 0) {
        const result = data.rows[0];
        res.status(200)
          .json({
            status: 200,
            data: result,
          });
      }
    });
};

export default {
  castBallot,
  getResult,
};
