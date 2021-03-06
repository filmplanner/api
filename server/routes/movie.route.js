import express from 'express';
import movieCtrl from '../controllers/movie.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/movies - Get list of movies */
  .get(movieCtrl.list);

router.route('/:movieId')
  /** GET /api/movies/:movieId - Get movies */
  .get(movieCtrl.get);

/** Load movie when API with movieId route parameter is hit */
router.param('movieId', movieCtrl.load);

export default router;
