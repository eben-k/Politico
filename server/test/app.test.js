// const assert = require('assert');
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { partyDetails, officeDetails } from './mocks/mockData';

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const {
  newParty, emptyField, spacedField,
} = partyDetails;
// const {
//   office, office2, newOffice, emptyField, spacedField,
// } = officeDetails;

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
  it.skip('should update a SINGLE Political Party on /party/<id> PUT', (done) => {
    chai.request(app)
      .get('/parties')
      .end((err, res) => {
        chai.request(app)
          .put(`/party/${res.body[0]._id}`)
          .send({ name: 'Spider' })
          .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('name');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.name.should.equal('Spider');
            done();
          });
      });
  });
  it.skip('should delete a SINGLE Political Party on /party/<id> DELETE', (done) => {
    chai.request(app)
      .get('/parties')
      .end((err, res) => {
        chai.request(app)
          .delete(`/party/${res.body[0]._id}`)
          .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('name');
            response.body.REMOVED.should.have.property('_id');
            response.body.REMOVED.name.should.equal('Bat');
            done();
          });
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
  it.skip('should add a SINGLE Political Office on /offices POST', (done) => {
    chai.request(app)
      .post('/offices')
      .send({ name: 'Java', lastName: 'Script' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.should.have.property('type');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Java');
        done();
      });
  });
});
