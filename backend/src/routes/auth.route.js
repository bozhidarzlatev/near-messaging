import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login",authController.login);
router.post("/logout", authController.logout);
router.put("/update-profile", protectedRoute, authController.updateProfile);
router.get("/check", protectedRoute, (req, res) => res.status(201).json(req.user));

export default router;