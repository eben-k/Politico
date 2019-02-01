import pool from './configDb';

pool.query('CREATE TABLE IF NOT EXISTS users(id UUID PRIMARY KEY, firstname VARCHAR(100) not null, lastname VARCHAR(100) not null, email VARCHAR(100) UNIQUE not null, phoneNumber VARCHAR(20) not null, passportUrl VARCHAR(50) not null, isAdmin Boolean not null, password VARCHAR(20) not null)');
pool.query('CREATE TABLE IF NOT EXISTS parties(id UUID PRIMARY KEY, name VARCHAR(100) not null, hqAddress VARCHAR(250) not null, logoUrl VARCHAR(100) not null, email VARCHAR(100), phoneNumber VARCHAR(20), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS offices(id SERIAL PRIMARY KEY, type VARCHAR(100) not null, name VARCHAR(100) not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS candidates(id SERIAL PRIMARY KEY, office INTEGER not null, party INTEGER not null, candidate INTEGER not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS votes(id SERIAL PRIMARY KEY, createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy INTEGER not null, office INTEGER not null, candidate INTEGER not null)');
pool.query('CREATE TABLE IF NOT EXISTS petitions(id SERIAL PRIMARY KEY, createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy INTEGER not null, office INTEGER not null, body TEXT not null)');
