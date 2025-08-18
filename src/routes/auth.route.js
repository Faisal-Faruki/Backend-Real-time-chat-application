import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";
const routher = express.Router();

routher.post("/signup", signup);
routher.post("/login",login);
routher.post("/logout", logout);

 routher.post("/onboarding", protectRoute, onboard);

 //Check if user logged in
 routher.get("/me",protectRoute,(req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default routher;