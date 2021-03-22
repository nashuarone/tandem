const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const courseController = require("../controllers/courseController");

const router = new Router();

router.post("", authMiddleware, courseController.createCourse);
router.get("", authMiddleware, courseController.getAllCourses);

module.exports = router;
