import express from 'express';
import PartyController from '../controller/parties';
import OfficeController from '../controller/offices';
import createPartyValidator from '../middleware/partyValidator';

const route = express.Router();

route.get('/parties', PartyController.getAllParties);
route.get('/parties/:partyId', PartyController.getParty);
route.get('/offices', OfficeController.getAllOffices);
route.get('/offices/:officeId', OfficeController.getOffice);
route.post('/parties', createPartyValidator, PartyController.addParty);


export default route;
