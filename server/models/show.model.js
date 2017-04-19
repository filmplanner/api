import mongoose from 'mongoose';

/**
 * Show Schema
 */
const ShowSchema = new mongoose.Schema({
  theater_id: {
    type: String,
    required: true
  },
  movie_id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  url: {
    type: String,
    required: true
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
   * @param {number} skip - Number of shows to be skipped.
   * @param {number} limit - Limit number of shows to be returned.
   * @returns {Promise<Show[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Show
 */
export default mongoose.model('Show', ShowSchema);
