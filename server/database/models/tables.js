import pool from './configDb';

pool.query('CREATE TABLE IF NOT EXISTS users(id SERIAL NOT NULL PRIMARY KEY, firstname VARCHAR(100) not null, lastname VARCHAR(100) not null, email VARCHAR(250) UNIQUE not null, phoneNumber VARCHAR(100) not null, passportUrl VARCHAR(50) not null, isAdmin Boolean not null DEFAULT (false), password VARCHAR(250) not null)');
pool.query('CREATE TABLE IF NOT EXISTS parties(id SERIAL PRIMARY KEY, name VARCHAR(100) not null, hqAddress VARCHAR(250) not null, logoUrl VARCHAR(100) not null, email VARCHAR(250), phoneNumber VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS offices(id SERIAL PRIMARY KEY, type VARCHAR(100) not null, name VARCHAR(100) not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS candidates(id SERIAL, userId INTEGER  NOT NULL, FOREIGN KEY (userId) references users(id) on delete cascade, office INTEGER NOT NULL, FOREIGN KEY (office) references offices(id) on delete cascade, party INTEGER NOT NULL, FOREIGN KEY (party) references parties(id) on delete cascade, appliedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (userId, office)');
pool.query('CREATE TABLE IF NOT EXISTS votes(id SERIAL, createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy INTEGER not null, FOREIGN KEY (createdBy) references users(id) on delete cascade, office INTEGER not null, FOREIGN KEY (office) references offices(id) on delete cascade, candidate INTEGER not null, FOREIGN KEY (candidate) references candidates(id) on delete cascade, PRIMARY KEY(createdBy, office)');
pool.query('CREATE TABLE IF NOT EXISTS petitions(id SERIAL PRIMARY KEY, createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP, createdBy INTEGER not null, FOREGN KEY (createdBy) references users(id) on delete cascade, office INTEGER not null, FOREIGN KEY (office) references offices(id) on delete cascade, body TEXT not null)');
