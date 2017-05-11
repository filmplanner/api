import express from 'express';
import showCtrl from '../controllers/show.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/:date')
  /** GET /api/shows/14-05-2017 - Get list of shows on a date */
  .get(showCtrl.list);

/** Load date when API with date route parameter is hit */
router.param('date', showCtrl.load);

export default router;
