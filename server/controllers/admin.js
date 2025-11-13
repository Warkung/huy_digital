const prisma = require("../config/prisma");
const { InternalError } = require("../utils/error");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id_user: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).send(users);
  } catch (error) {
    InternalError(res, error);
  }
};
