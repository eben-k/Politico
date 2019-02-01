import pool from './configDb';

pool.query('DROP TABLE IF EXISTS users');
pool.query('DROP TABLE IF EXISTS parties');
pool.query('DROP TABLE IF EXISTS offices');
pool.query('DROP TABLE IF EXISTS candidates');
pool.query('DROP TABLE IF EXISTS votes');
pool.query('DROP TABLE IF EXISTS petitions');
