import express from 'express';
import getAllParties from '../controller/parties';
import getAllOffices from '../controller/offices';

const route = express.Router();

route.get('/parties', getAllParties);
route.get('/offices', getAllOffices);

export default route;
