import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import Theater from '../models/theater.model';

chai.config.includeStack = true;

/**
 * root level hooks
 */
const mockTheater = {
  id: 100,
  name: 'Pathe Spuimarkt',
  city: 'Den Haag',
  image: '',
};
let theater;
let obj;

before((done) => {
  theater = new Theater(mockTheater);

  obj = theater.save()
    .then((savedTheater) => {
      obj = savedTheater;
      done();
    });
});

after((done) => {
  obj.remove();
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Theater APIs', () => {
  describe('# GET /api/theaters/:theaterId', () => {
    it('should get theater details', (done) => {
      request(app)
        .get(`/api/theaters/${mockTheater.id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.id).to.equal(mockTheater.id);
          expect(res.body.name).to.equal(mockTheater.name);
          expect(res.body.city).to.equal(mockTheater.city);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when theater does not exists', (done) => {
      request(app)
        .get('/api/theaters/300')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/theaters/', () => {
    it('should get all theaters', (done) => {
      request(app)
        .get('/api/theaters')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all theaters (with limit and skip)', (done) => {
      request(app)
        .get('/api/theaters')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });
});
