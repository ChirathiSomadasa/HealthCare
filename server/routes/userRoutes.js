const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const USER_ROLES = require("../constants/roles");

const router = express.Router();

router.get(
  "/",
  authMiddleware([USER_ROLES.STAFF, USER_ROLES.DOCTOR, USER_ROLES.PATIENT]),
  userController.getUsers
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.STAFF]),
  userController.getUsersCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.STAFF, USER_ROLES.PATIENT, USER_ROLES.DOCTOR]),
  userController.getUserById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.STAFF, USER_ROLES.PATIENT]),
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.STAFF, USER_ROLES.DOCTOR]),
  userController.deleteUser
);

module.exports = router;
