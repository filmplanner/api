import express from 'express';
import theaterCtrl from '../controllers/theater.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/theaters - Get list of theaters */
  .get(theaterCtrl.list);

router.route('/:theaterId')
  /** GET /api/theaters/:theaterId - Get theater */
  .get(theaterCtrl.get);

/** Load theater when API with theaterId route parameter is hit */
router.param('theaterId', theaterCtrl.load);

export default router;
