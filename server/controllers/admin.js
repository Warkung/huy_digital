const { InternalError } = require("../utils/error");

exports.getAllAdmin = async (req, res) => {
  try {
    res.send("Get Admin");
  } catch (error) {
    InternalError(res, error);
  }
};
