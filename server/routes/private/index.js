import express from 'express';
import * as ReadController from '../../controllers/ReadController';

let router = express.Router();

// Viewing of participants and assets
router.route('/:type/:id').get((req, res) => {
  ReadController.viewPage(req, res)});
router.route('/:type').get((req, res) => {
  ReadController.viewPage(req, res)});

export default router;
