import { Router } from "express";
import { loginUser, logOut, refreshAccessToken, registerUser, updateUserAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)

//Secured Routes
router.route("/logout").post(verifyJwt,logOut)

router.route("/refresh-token").post( refreshAccessToken)

router.route("/updateAvatar").post(
    upload.single("avatar"),
    verifyJwt,
    updateUserAvatar
)
export default router