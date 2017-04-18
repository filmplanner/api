import express from 'express';
import showCtrl from '../controllers/show.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/shows - Get list of shows */
  .get(showCtrl.list);

export default router;
