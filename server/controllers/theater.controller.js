import Theater from '../models/theater.model';

/**
 * Load theater and append to req.
 */
function load(req, res, next, id) {
  Theater.get(id)
    .then((theater) => {
      req.theater = theater; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get theater
 * @returns {Theater}
 */
function get(req, res) {
  return res.json(req.theater);
}

/**
 * Get theater list.
 * @property {number} req.query.skip - Number of theaters to be skipped.
 * @property {number} req.query.limit - Limit number of theaters to be returned.
 * @returns {Theater[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Theater.list({ limit, skip })
    .then(theaters => res.json(theaters))
    .catch(e => next(e));
}

export default { load, get, list };
