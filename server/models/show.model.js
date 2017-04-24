import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Show Schema
 */
const ShowSchema = new mongoose.Schema({
  theater_id: {
    type: Number,
    required: true
  },
  movie_id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  },
  type: {
    type: Array
  },
  url: {
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
ShowSchema.method({
});

/**
 * Statics
 */
ShowSchema.statics = {
  /**
   * List shows
   * @property {moment} req.query.date - Date of shows to be returned.
   * @property {string[]} req.query.theaterIds - Array of theaters ids.
   * @property {string[]} req.query.movieIds - Array of movie ids.
   * @returns {Promise<Show[]>}
   */
  list(date, theaterIds, movieIds) {
    const query = this.find(
      {
        date: {
          $gt: date.toString(),
          $lte: date.add(1, 'days').toString()
        }
      });

    if (theaterIds.length > 0) {
      query.where('theater_id').in(theaterIds);
    }

    if (movieIds.length > 0) {
      query.where('movie_id').in(movieIds);
    }

    return query.exec()
      .then((shows) => {
        if (shows.length > 0) {
          return shows;
        }
        const err = new APIError('No shows found!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef Show
 */
export default mongoose.model('Show', ShowSchema);
