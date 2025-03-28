import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
import { commentOnTrail, createTrail, deleteComment, deleteTrail, getAllTrails, getSingleTrail, updateTrail } from '../controllers/trailControllers.js';

const router = express.Router();

router.post("/new",isAuth,uploadFile,createTrail);
router.get("/all",isAuth,getAllTrails);
router.get("/:id",isAuth,getSingleTrail);
router.put("/:id",isAuth,updateTrail);
router.delete("/:id",isAuth,deleteTrail);
router.post("/comment/:id",isAuth,commentOnTrail);
router.delete("/comment/:id",isAuth,deleteComment);

export default router;