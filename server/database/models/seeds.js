import bcrypt from 'bcryptjs';
import pool from './configDb';
// import Auth from '../controller/authController';


const hashed = bcrypt.hashSync('fghsteur', 10);
const adminFirstname = 'Admin';
const adminLastname = 'Admin';
const adminEmail = 'admin@politico.com';
const adminPassword = hashed;
const adminPhoneNumber = '125363778';
const isAdmin = true;
const adminPassportUrl = 'rhfjj567746';


/*eslint-disable */ const adminData = [adminFirstname, adminLastname, adminEmail, adminPassword, adminPhoneNumber, isAdmin, adminPassportUrl];
const userQuery = 'INSERT INTO users(firstname, lastname, email, password, phoneNumber, isadmin, passportUrl) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const user1 = ['Stanley', 'Obi', 'stapolly@yahoo.com', hashed, '08025862169', false, 'ldqpeeed.jpg'];
const user2 = ['George', 'Ugboma', 'georgeeano@yahoo.com', hashed, '08034795933', false, 'qpeeed.jpg'];

const party1 = ['Peoples party', '12 Ozumba mbadiwe street, lagos', 'eeed.jpg', 'amin@gmail.com', '23456789'];

const party2 = ['All Congress', '12 Ozumba mbadiwe street, lagos', 'hgeed.jpg', 'adin@gmail.com', '23456789'];

const party3 = ['The grand alliance', '12 Ozumba mbadiwe street, lagos', 'dgfhjjd.jpg', 'adm@gmail.com', '23456789'];

const office1 = ['Federal', 'President'];
const office2 = ['State', 'Governor'];
const office3 = ['local government', 'councillor'];

const officeQuery = 'INSERT INTO offices(type, name) VALUES ($1, $2)';
const partyQuery = 'INSERT INTO parties(name, hqAddress, logoUrl, email, phone) VALUES ($1, $2, $3, $4, $5)';

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query(userQuery, adminData);
    await client.query(userQuery, user1);
    await client.query(userQuery, user2);
    await client.query(officeQuery, office1);
    await client.query(officeQuery, office2);
    await client.query(officeQuery, office3);
    await client.query(partyQuery, party1);
    await client.query(partyQuery, party2);
    await client.query(partyQuery, party3);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

seed();
