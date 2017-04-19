import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import theaterRoutes from './theater.route';
import movieRoutes from './movie.route';
import showRoutes from './show.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount theater routes at /theaters
router.use('/theaters', theaterRoutes);

// mount movie routes at /movies
router.use('/movies', movieRoutes);

// mount show routes at /shows
router.use('/shows', showRoutes);

export default router;
