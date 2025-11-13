const router = require("express").Router();
const { getAllUsers } = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middleware/authCheck");

router.route("/users").get(authCheck, adminCheck, getAllUsers);

module.exports = router;
