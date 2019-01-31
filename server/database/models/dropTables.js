import pool from './configDb';

pool.query('DROP TABLE IF EXISTS Users');
pool.query('DROP TABLE IF EXISTS Parties');
pool.query('DROP TABLE IF EXISTS Offices');
pool.query('DROP TABLE IF EXISTS Candidates');
pool.query('DROP TABLE IF EXISTS Votes');
pool.query('DROP TABLE IF EXISTS Petitions');
