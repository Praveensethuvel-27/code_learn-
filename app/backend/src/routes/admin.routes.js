const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const {
  listUsers,
  listLessons,
  listProblems,
  setUserRole,
  createLesson,
  updateLesson,
  deleteLesson,
  createProblem,
  updateProblem,
  deleteProblem,
  getAllSubmissions,
  getAllSavedCodes,
} = require("../controllers/admin.controller");

const router = express.Router();

router.use(requireAuth, requireRole("admin"));

router.get("/users", listUsers);
router.get("/lessons", listLessons);
router.get("/problems", listProblems);
router.get("/submissions", getAllSubmissions);
router.get("/savedcodes", getAllSavedCodes);
router.patch("/users/:id/role", setUserRole);

router.post("/lessons", createLesson);
router.patch("/lessons/:id", updateLesson);
router.delete("/lessons/:id", deleteLesson);

router.post("/problems", createProblem);
router.patch("/problems/:id", updateProblem);
router.delete("/problems/:id", deleteProblem);

module.exports = router;

