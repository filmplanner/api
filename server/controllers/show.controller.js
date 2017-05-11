import moment from 'moment';
import Show from '../models/show.model';

/**
 * Load date and append to req.
 */
function load(req, res, next, date) {
  if(date) {
    req.date = moment(date, 'DD-MM-YYYY');
    return next();
  } else {
    const err = new APIError('Cant retreive data in the past!', httpStatus.NOT_FOUND);
    next(err);
  }
}

/**
 * Get show list on a date.
 * @property {string} req.query.theaterIds - Comma seperated string of theaters.
 * @property {string} req.query.movieIds - Comma seperated string of movies.
 * @returns {Show[]}
 */
function list(req, res, next) {
  const { theaterIds = null, movieIds = null } = req.query;

  const _theaterIds = (theaterIds != null ? theaterIds.split(',') : []);
  const _movieIds = (movieIds != null ? movieIds.split(',') : []);

  Show.list(req.date, _theaterIds, _movieIds)
    .then(shows => res.json(shows))
    .catch(e => next(e));
}

export default { load, list };
