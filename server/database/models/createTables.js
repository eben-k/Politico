import pool from './configDb';
import user from './user';
import party from './party';
import candidate from './candidate';
import vote from './vote';
import office from './office';

const dropTables = 'DROP TABLE IF EXISTS users, parties, offices, candidates, votes CASCADE';

const createTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(dropTables);
    await client.query(user.CREATE_TABLE);
    await client.query(office.CREATE_TABLE);
    await client.query(party.CREATE_TABLE);
    await client.query(candidate.CREATE_TABLE);
    await client.query(vote.CREATE_TABLE);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

createTable();
