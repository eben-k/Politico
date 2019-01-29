import express from 'express';
import PartyController from '../controller/parties';
import OfficeController from '../controller/offices';

const route = express.Router();

route.get('/parties', PartyController.getAllParties);
route.get('/parties/:partyId', PartyController.getParty);
route.get('/offices', OfficeController.getAllOffices);
route.get('/offices/:officeId', OfficeController.getOffice);


export default route;
