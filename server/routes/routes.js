import express from 'express';
import PartyController from '../controller/parties';
import OfficeController from '../controller/offices';
import PartyValidator from '../middleware/partyValidator';
import createOfficeValidator from '../middleware/officeValidator';
import createUser from '../database/controller/usersController';
import checkSignup from '../database/middleware/userValidator';

const { createPartyValidator, updatePartyValidator } = PartyValidator;
const {
  getAllParties, getParty, addParty, updateParty, deleteParty,
} = PartyController;
const { getAllOffices, getOffice, addOffice } = OfficeController;
const route = express.Router();

route.get('/parties', PartyController.getAllParties);
route.get('/parties/:partyId', PartyController.getParty);
route.get('/offices', OfficeController.getAllOffices);
route.get('/offices/:officeId', OfficeController.getOffice);
route.post('/parties', createPartyValidator, PartyController.addParty);
route.post('/offices', createOfficeValidator, OfficeController.addOffice);
route.delete('/parties/:partyId', PartyController.deleteParty);
route.patch('/parties/:partyId', updatePartyValidator, updateParty);
route.post('/auth/signup', checkSignup, createUser);


export default route;
