import pool from './configDb';

const sampleUser = (id, firstname, lastname, email, phoneNumber, passportUrl, isAdmin, password) => {
  const query = {
    text: 'INSERT INTO Users(id, firstname, lastname , email, phoneNumber, passportUrl, isAdmin, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING firstname, lastname, email, isAdmin',
    values: [id, firstname, lastname, email, phoneNumber, passportUrl, isAdmin, password],
  };
  pool.query(query);
};

const sampleParty = (id, name, hqAddress, logoUrl, email, phoneNumber) => {
  const query = {
    text: 'INSERT INTO Parties(id, name, hqAddress, logoUrl, email, phoneNumber) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [id, name, hqAddress, logoUrl, email, phoneNumber],
  };
  pool.query(query);
};

const sampleOffice = (id, type, name) => {
  const query = {
    text: 'INSERT INTO Offices(id, type, name) VALUES($1, $2, $3) RETURNING *',
    values: [id, type, name],
  };
  pool.query(query);
};

const sampleCandidate = (id, office, party, candidate) => {
  const query = {
    text: 'INSERT INTO Candidates(id, office, party, candidate) VALUES($1, $2, $3, $4) RETURNING *',
    values: [id, office, party, candidate],
  };
  pool.query(query);
};

const sampleVote = (id, createdBy, office, candidate) => {
  const query = {
    text: 'INSERT INTO Votes(id, createdBy, office, candidate) VALUES($1, $2, $3, $4) RETURNING *',
    values: [id, createdBy, office, candidate],
  };
  pool.query(query);
};

const samplePetition = (id, createdBy, office, body) => {
  const query = {
    text: 'INSERT INTO Petition(id, createdBy, office, body) VALUES($1, $2, $3, $4) RETURNING *',
    values: [id, createdBy, office, body],
  };
  pool.query(query);
};

sampleUser(1, 'admin', 'admin', 'admin@gmail.com', '233334455', 'admin.admin', true, 'ashffjgjj');
sampleUser(2, 'chidimma', 'chidimma', 'chidimma@gmail.com', '458688894', 'chidimma.admin', false, 'asdffjgj');
sampleUser(3, 'ogechi ibe', 'ogechi', 'ogechi@gmail.com', '458688894', 'ogechi.admin', false, 'asdfghhh');

sampleParty(1, 'Freedom Party', '40 aakija street', 'logo.jpg', 'admin@gmail.com', '23456789');
sampleParty(2, 'Liberty Party', '20 aakija street', 'logo1.jpg', 'admin@gmail.com', '23456789');
sampleParty(3, 'Democratic Party', '60 aakija street', 'logo2.jpg', 'admin@gmail.com', '23456789');

sampleOffice(1, 'Federal', 'President');
sampleOffice(2, 'State', 'Governor');
sampleOffice(3, 'Local Government', 'Chairperson');

sampleCandidate(1, 2, 3, 2);
sampleCandidate(2, 3, 1, 3);
sampleCandidate(3, 1, 2, 2);

sampleVote(1, 2, 1, 3);
sampleVote(2, 3, 2, 2);
sampleVote(3, 2, 3, 1);

samplePetition(1, 2, 1, 'overvoting concerns');
samplePetition(2, 3, 2, 'invalid voters');
