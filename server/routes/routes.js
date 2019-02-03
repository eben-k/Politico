import express from 'express';
import PartyController from '../controller/parties';
import OfficeController from '../controller/offices';
import PartyValidator from '../middleware/partyValidator';
import createOfficeValidator from '../middleware/officeValidator';
import UserController from '../database/controller/usersController';
import UserValidator from '../database/middleware/userValidator';

const { createPartyValidator, updatePartyValidator } = PartyValidator;
const {
  getAllParties, getParty, addParty, updateParty, deleteParty,
} = PartyController;
const { getAllOffices, getOffice, addOffice } = OfficeController;
const { createUser, loginUser } = UserController;
const { checkSignup, checkLogin } = UserValidator;
const route = express.Router();

route.get('/parties', getAllParties);
route.get('/parties/:partyId', getParty);
route.get('/offices', getAllOffices);
route.get('/offices/:officeId', getOffice);
route.post('/parties', createPartyValidator, addParty);
route.post('/offices', createOfficeValidator, addOffice);
route.delete('/parties/:partyId', deleteParty);
route.patch('/parties/:partyId', updatePartyValidator, updateParty);
route.post('/auth/signup', checkSignup, createUser);
route.post('/auth/login', checkLogin, loginUser);


export default route;
