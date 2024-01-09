import express from 'express'
import { getAuthenticatedUser, login, logout, signup } from '../controllers/users';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", getAuthenticatedUser)

export default router;