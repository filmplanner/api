import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import Movie from '../models/movie.model';

chai.config.includeStack = true;

/**
 * root level hooks
 */
const mockMovie = {
  id: '100',
  title: 'Harry Potter',
  description: 'Description of the Harry Potter movie',
  url: '',
  image: '',
};
let movie;
let obj;

before((done) => {
  movie = new Movie(mockMovie);

  obj = movie.save()
    .then((savedMovie) => {
      obj = savedMovie;
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

describe('## Movie APIs', () => {
  describe('# GET /api/movies/:movieId', () => {
    it('should get movie details', (done) => {
      request(app)
        .get(`/api/movies/${mockMovie.id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.id).to.equal(mockMovie.id);
          expect(res.body.title).to.equal(mockMovie.title);
          expect(res.body.description).to.equal(mockMovie.description);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when movie does not exists', (done) => {
      request(app)
        .get('/api/movies/999')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/movies/', () => {
    it('should get all movies', (done) => {
      request(app)
        .get('/api/movies')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all movies (with limit and skip)', (done) => {
      request(app)
        .get('/api/movies')
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
