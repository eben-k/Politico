import express from 'express';
import getAllParties from '../controller/parties';

const route = express.Router();

route.get('/parties', getAllParties);

export default route;
