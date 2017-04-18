import Movie from '../models/movie.model';

/**
 * Get movie
 * @returns {Movie}
 */
function get(req, res) {
  return res.json(req.movie);
}

/**
 * Get movie list.
 * @property {number} req.query.skip - Number of movies to be skipped.
 * @property {number} req.query.limit - Limit number of movies to be returned.
 * @returns {Movie[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Movie.list({ limit, skip })
    .then(movies => res.json(movies))
    .catch(e => next(e));
}

export default { get, list };
