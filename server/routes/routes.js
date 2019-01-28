import express from 'express';
import getAllParties from '../controller/parties';
import getAllOffices from '../controller/offices';

const route = express.Router();

route.get('/api/v1/parties', getAllParties);
route.get('/api/v1/offices', getAllOffices);

export default route;
