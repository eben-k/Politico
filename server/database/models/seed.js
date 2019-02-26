import bcrypt from 'bcryptjs';
import pool from './configDb';

const sampleUser = (firstname, lastname, email, phoneNumber, passportUrl, isAdmin, password) => {
  const hashed = bcrypt.hashSync(password, 10);
  const query = {
    text: 'INSERT INTO users(firstname, lastname , email, phoneNumber, passportUrl, isAdmin, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING firstname, lastname, email, isAdmin',
    values: [firstname, lastname, email, phoneNumber, passportUrl, isAdmin, hashed],
  };
  pool.query(query);
};

const sampleParty = (name, hqAddress, logoUrl, email, phoneNumber) => {
  const query = {
    text: 'INSERT INTO parties(name, hqAddress, logoUrl, email, phoneNumber) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [name, hqAddress, logoUrl, email, phoneNumber],
  };
  pool.query(query);
};

const sampleOffice = (type, name) => {
  const query = {
    text: 'INSERT INTO offices(type, name) VALUES($1, $2) RETURNING *',
    values: [type, name],
  };
  pool.query(query);
};

// const sampleCandidate = (office, party, candidate) => {
//   const query = {
//     text: 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *',
//     values: [office, party, candidate],
//   };
//   pool.query(query);
// };

// const sampleVote = (createdBy, office, candidate) => {
//   const query = {
//     text: 'INSERT INTO votes(createdBy, office, candidate) VALUES($1, $2, $3) RETURNING *',
//     values: [createdBy, office, candidate],
//   };
//   pool.query(query);
// };

// const samplePetition = (id, createdBy, office, body) => {
//   const query = {
//     text: 'INSERT INTO petitions(id, createdBy, office, body) VALUES($1, $2, $3, $4) RETURNING *',
//     values: [id, createdBy, office, body],
//   };
//   pool.query(query);
// };

sampleUser('admin', 'admin', 'admin@gmail.com', '233334455', 'admin.admin', true, 'adminns');
sampleUser('chidimma', 'chidimma', 'chidimma@gmail.com', '458688894', 'chidimma.admin', false, 'dhgjfjjdj');
sampleUser('ogechi ibe', 'ogechi', 'ogechi@gmail.com', '458688894', 'ogechi.admin', false, 'ghejjrj');

sampleParty('Freedom Party', '40 aakija street', 'logo.jpg', 'admin@gmail.com', '23456789');
sampleParty('Liberty Party', '20 aakija street', 'logo1.jpg', 'admin@gmail.com', '23456789');
sampleParty('Democratic Party', '60 aakija street', 'logo2.jpg', 'admin@gmail.com', '23456789');

sampleOffice('Federal', 'President');
sampleOffice('State', 'Governor');
sampleOffice('Local Government', 'Chairperson');

// sampleCandidate(2, 3, 2);
// sampleCandidate(3, 1, 3);
// sampleCandidate(1, 2, 2);

// sampleVote(2, 1, 3);
// sampleVote(3, 2, 2);
// sampleVote(2, 3, 1);

// samplePetition(1, 2, 1, 'overvoting concerns');
// samplePetition(2, 3, 2, 'invalid voters');
