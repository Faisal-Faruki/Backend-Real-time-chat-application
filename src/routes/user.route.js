import express from 'express';
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, 
    getMyFriends , 
    sendFriendRequest, 
    acceptFriendRequest,
    getFriendRequests,
     getOutgoingFriendReqs} from '../controllers/user.controller.js';


const routher = express.Router();


// apply auth middleware to all routes
routher.use(protectRoute);

routher.get("/", getRecommendedUsers);
routher.get("/friends", getMyFriends);

routher.post("/friend-request/:id", sendFriendRequest);
routher.put("/friend-request/:id/accept", acceptFriendRequest);



routher.get("/friend-requests", getFriendRequests);
routher.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default routher;