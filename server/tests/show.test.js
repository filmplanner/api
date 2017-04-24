import mongoose from 'mongoose';
import moment from 'moment';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import Show from '../models/show.model';

chai.config.includeStack = true;

/**
 * root level hooks
 */
const mockShow = {
  movie_id: 100,
  theater_id: 100,
  date: Date(),
  start: 30000,
  end: 50000,
};
let show;
let obj;

before((done) => {
  show = new Show(mockShow);

  obj = show.save()
    .then((savedShow) => {
      obj = savedShow;
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

describe('## show APIs', () => {
  describe('# GET /api/shows/', () => {
    it('should get all shows from date', (done) => {
      request(app)
        .get('/api/shows')
        .query({ date: moment().format('DD-MM-YYYY') })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all shows from date & theaters', (done) => {
      request(app)
        .get('/api/shows')
        .query({ date: moment().format('DD-MM-YYYY'), theaterIds: '100' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all shows from date, theaters & movies', (done) => {
      request(app)
        .get('/api/shows')
        .query({ date: moment().format('DD-MM-YYYY'), theaterIds: '100', movieIds: '100' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when shows not found', (done) => {
      request(app)
        .get('/api/shows')
        .query({ date: moment().format('DD-MM-YYYY'), theaterIds: '99', movieIds: '99' })
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });
});
