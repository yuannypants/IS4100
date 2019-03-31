import express from 'express';
import * as AuthController from '../../controllers/AuthController';

let router = express.Router();

router.route('/register') // /api/public/register
  .post((req, res) => {
    AuthController.register(req, res);
  });

router.route('/login')
  .post((req, res) => {
    AuthController.login(req, res);
  });


export default router;