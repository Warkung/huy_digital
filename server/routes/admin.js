const router = require("express").Router();
const { getAllCustomers } = require("../controllers/customers");

router.route("/admin").get(getAllCustomers);

module.exports = router;
