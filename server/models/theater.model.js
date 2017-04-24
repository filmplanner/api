import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Theater Schema
 */
const TheaterSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
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
TheaterSchema.method({
});

/**
 * Statics
 */
TheaterSchema.statics = {
  /**
   * Get theater.
   * @param {int} id - The id of theater.
   * @returns {Promise<Theater, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((theater) => {
        if (theater) {
          return theater;
        }
        const err = new APIError('No such theater exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List theaters.
   * @param {number} skip - Number of theaters to be skipped.
   * @param {number} limit - Limit number of theaters to be returned.
   * @returns {Promise<Theater[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Theater
 */
export default mongoose.model('Theater', TheaterSchema);
