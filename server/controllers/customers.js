const { InternalError } = require("../utils/error");

exports.getAllCustomers = async (req, res) => {
  try {
    res.send("Get Customers");
  } catch (error) {
    InternalError(res, error);
  }
};
