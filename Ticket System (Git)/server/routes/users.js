const { Router } = require("express");


const { signin, signup } = require("../controllers/user.js");
const {validateUserLogin, validateUserSignUp} = require("../middleware/auth.js")

const router = Router();

router.post("/signin",validateUserLogin, signin);
router.post("/signup",validateUserSignUp, signup);

module.exports = router;
