import Movie from '../models/movie.model';

/**
 * Load movie and append to req.
 */
function load(req, res, next, id) {
  Movie.get(id)
    .then((movie) => {
      req.movie = movie; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

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

export default { load, get, list };
