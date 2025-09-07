import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();  // Fixed typo here

router.post("/signup", signup);    // Fixed typo here
router.post("/login",login);       // Fixed typo here
router.post("/logout", logout);    // Fixed typo here

router.post("/onboarding", protectRoute, onboard);  // Fixed typo here

//Check if user logged in
router.get("/me",protectRoute,(req, res) => {       // Fixed typo here
  res.status(200).json({ success: true, user: req.user });
});

export default router;  // Fixed typo here






















// import express from 'express';
// import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
// import { protectRoute } from "../middleware/auth.middleware.js";
// const routher = express.Router();

// routher.post("/signup", signup);
// routher.post("/login",login);
// routher.post("/logout", logout);

//  routher.post("/onboarding", protectRoute, onboard);

//  //Check if user logged in
//  routher.get("/me",protectRoute,(req, res) => {
//   res.status(200).json({ success: true, user: req.user });
// });

// export default routher;