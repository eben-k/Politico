import express from 'express';
import PartyController from '../controller/parties';
import OfficeController from '../controller/offices';
import createPartyValidator from '../middleware/partyValidator';
import createOfficeValidator from '../middleware/officeValidator';

const route = express.Router();

route.get('/parties', PartyController.getAllParties);
route.get('/parties/:partyId', PartyController.getParty);
route.get('/offices', OfficeController.getAllOffices);
route.get('/offices/:officeId', OfficeController.getOffice);
route.post('/parties', createPartyValidator, PartyController.addParty);
route.post('/offices', createOfficeValidator, OfficeController.addOffice);
route.delete('/parties/:partyId', PartyController.deleteParty);
route.patch('/parties/:partyId', createPartyValidator, PartyController.updateParty);

export default route;
