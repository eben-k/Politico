import pool from './configDb';

pool.query('DROP TABLE IF EXISTS Users cascade');
pool.query('DROP TABLE IF EXISTS Parties cascade');
pool.query('DROP TABLE IF EXISTS Offices cascade');
pool.query('DROP TABLE IF EXISTS Candidates cascade');
pool.query('DROP TABLE IF EXISTS Votes');
pool.query('DROP TABLE IF EXISTS Petitions');
