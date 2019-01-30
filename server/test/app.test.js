// const assert = require('assert');
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { partyDetails, officeDetails } from './mocks/mockData';

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const {
  newParty, emptyField, spacedField, updateParty,
} = partyDetails;
const {
  newOffice, nullField, spaceField,
} = officeDetails;

describe('Tests for Homepage and invalid url endpoints', () => {
  describe('Test for Homepage Endpoint', () => {
    it.skip('Should return Welcome Page', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Welcome to Politico!');
          done();
        });
    });
  });
  describe('Invalid Url', () => {
    it('invalid endpoint should respond with error', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Page not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
describe('Political Parties', () => {
  it('should list ALL Political Parties on /parties GET', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('should list a SINGLE Political Party on /party/<id> GET', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('it should not get party that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/parties/50')
      .end((err, res) => {
        expect(res.body.error).to.eql('This party does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should add a SINGLE Political Party on /parties POST', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('it should not post party with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(emptyField)
      .end((err, res) => {
        expect(res.body.errors[0]).to.eql('Political Party name is required');
        expect(res.body.errors[1]).to.eql('Party name should be more than 5 characters');
        expect(res.body.errors[2]).to.eql('Party name should be valid');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not post party with only spaces in the field', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(spacedField)
      .end((err, res) => {
        // expect(res.body.error).to.eql('Please fill in all fields');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should update a SINGLE Political Party on /party/<id> PATCH', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/1')
      .send(updateParty)
      .end((err, res) => {
        expect(res.body.data).to.be.an('array');
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should not update Party if party does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/parties/80')
      .send(newParty)
      .end((err, res) => {
        expect(res.body.error).to.eql('This Party does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should delete a SINGLE Political Party on /party/<id> DELETE', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/3')
      .end((err, res) => {
        expect(res.body.data).to.be.an('array');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('it should not delete party that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/50')
      .end((err, res) => {
        expect(res.body.error).to.eql('This party does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
});
describe('Political Offices', () => {
  it('should list ALL Political Offices on /offices GET', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('should list a SINGLE Political Office on /office/<id> GET', (done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('it should not get an office that does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/offices/50')
      .end((err, res) => {
        expect(res.body.error).to.eql('This office does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should add a SINGLE Political Office on /offices POST', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
  it('it should not post office with empty field', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(nullField)
      .end((err, res) => {
        expect(res.body.errors[0]).to.eql('Political Office type is required');
        expect(res.body.errors[1]).to.eql('Office type should be more than 4 characters');
        expect(res.body.errors[2]).to.eql('Office type should be valid');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('it should not post office with only spaces in the field', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .send(spaceField)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
