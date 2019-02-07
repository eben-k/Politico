import pool from './configDb';

pool.query('DROP TABLE IF EXISTS users cascade');
pool.query('DROP TABLE IF EXISTS parties cascade');
pool.query('DROP TABLE IF EXISTS offices cascade');
pool.query('DROP TABLE IF EXISTS candidates cascade');
pool.query('DROP TABLE IF EXISTS votes');
// pool.query('DROP TABLE IF EXISTS Petitions');
