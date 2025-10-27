const router = require("express").Router();
const { getAllCustomers } = require("../controllers/customers");

router.route("/customers").get(getAllCustomers);

module.exports = router;
