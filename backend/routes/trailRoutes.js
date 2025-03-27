import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
import { createTrail } from '../controllers/trailControllers.js';

const router = express.Router();

router.post("/new",isAuth,uploadFile,createTrail);

export default router;