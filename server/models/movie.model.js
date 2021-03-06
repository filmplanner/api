import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Movie Schema
 */
const MovieSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  advisory: {
    type: Array
  },
  url: {
    type: String
  },
  image: {
    type: String
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
MovieSchema.method({
});

/**
 * Statics
 */
MovieSchema.statics = {
  /**
   * Get movie.
   * @param {int} id - The id of movie.
   * @returns {Promise<Movie, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((movie) => {
        if (movie) {
          return movie;
        }
        const err = new APIError('No such movie exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List movies.
   * @param {number} skip - Number of movies to be skipped.
   * @param {number} limit - Limit number of movies to be returned.
   * @returns {Promise<Movie[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Movie
 */
export default mongoose.model('Movie', MovieSchema);
