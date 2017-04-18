import Theater from '../models/theater.model';

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

export default { get, list };
