import express from 'express';
import getAllParties from '../controller/parties';

const route = express.Router();

route.get('/api/v1/parties', getAllParties);

export default route;
