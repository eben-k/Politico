import express from 'express';
import PartyController from '../database/controller/partyController';
import OfficeController from '../database/controller/officeController';
import PartyValidator from '../middleware/partyValidator';
import createOfficeValidator from '../middleware/officeValidator';
import idValidator from '../database/middleware/idValidator';
import UserController from '../database/controller/usersController';
import UserValidator from '../database/middleware/userValidator';
import authenticate from '../database/middleware/tokenVerify';
import verifyAdmin from '../database/middleware/adminVerify';
import createCandidate from '../database/controller/candidateController';
import VoteController from '../database/controller/voteController';


const { createPartyValidator, updatePartyValidator } = PartyValidator;
const {
  getAllParties, getParty, addParty, updateParty, deleteParty,
} = PartyController;
const { getAllOffices, getOffice, addOffice } = OfficeController;
const { createUser, loginUser } = UserController;
const { checkSignup, checkLogin } = UserValidator;
const { castBallot, getResult } = VoteController;
const route = express.Router();

route.get('/parties', authenticate, getAllParties);
route.get('/parties/:partyId', authenticate, idValidator, getParty);
route.get('/offices', authenticate, getAllOffices);
route.get('/offices/:officeId', authenticate, idValidator, getOffice);
route.post('/parties', authenticate, verifyAdmin, createPartyValidator, addParty);
route.post('/offices', authenticate, verifyAdmin, createOfficeValidator, addOffice);
route.delete('/parties/:partyId', authenticate, verifyAdmin, idValidator, deleteParty);
route.patch('/parties/:partyId', authenticate, verifyAdmin, idValidator, updatePartyValidator, updateParty);
route.post('/auth/signup', checkSignup, createUser);
route.post('/auth/login', checkLogin, loginUser);
route.post('/offices/:userId/register', authenticate, verifyAdmin, createCandidate);
route.post('/votes', authenticate, castBallot);
route.get('/offices/:officeId/result', authenticate, idValidator, getResult);

export default route;
