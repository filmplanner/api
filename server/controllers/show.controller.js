import Show from '../models/show.model';

/**
 * Get theater
 * @returns {Show}
 */
function get(req, res) {
  return res.json(req.show);
}

/**
 * Get show list.
 * @property {number} req.query.skip - Number of shows to be skipped.
 * @property {number} req.query.limit - Limit number of shows to be returned.
 * @returns {Show[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Show.list({ limit, skip })
    .then(theaters => res.json(theaters))
    .catch(e => next(e));
}

export default { get, list };
