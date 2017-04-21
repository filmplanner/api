import moment from 'moment';
import Show from '../models/show.model';

/**
 * Get show list.
 * @property {date} req.query.date - Date of shows to be returned.
 * @property {string} req.query.theaterIds - Comma seperated string of theaters.
 * @property {string} req.query.movieIds - Comma seperated string of movies.
 * @returns {Show[]}
 */
function list(req, res, next) {
  const { date = new Date(), theaterIds = null, movieIds = null } = req.query;

  const _date = moment(date, 'DD-MM-YYYY');
  const _theaterIds = (theaterIds != null ? theaterIds.split(',') : []);
  const _movieIds = (movieIds != null ? movieIds.split(',') : []);

  Show.list(_date, _theaterIds, _movieIds)
    .then(shows => res.json(shows))
    .catch(e => next(e));
}

export default { list };
