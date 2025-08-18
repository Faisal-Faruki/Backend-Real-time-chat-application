import express from 'express';
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controllers.js";

const routher = express.Router();

routher.get("/token", protectRoute, getStreamToken);





export default routher;