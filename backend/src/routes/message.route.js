import express from 'express';
import { messageController } from '../controllers/message.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection,protectedRoute)

router.get("/contacts", messageController.getAllContacts);
router.get("/chats", messageController.getChatPartners);
router.get("/:id", messageController.getMessagesByUserId);
router.post("/send/:id", messageController.sendMessage);

export default router;