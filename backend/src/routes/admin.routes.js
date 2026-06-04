const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const ctrl = require("../controllers/admin.controller");

const router = express.Router();
router.use(requireAuth, requireRole("admin"));

// Dashboard - only add if function exists in controller
if (typeof ctrl.getDashboardStats === "function") {
  router.get("/dashboard", ctrl.getDashboardStats);
}

router.get("/users",        ctrl.listUsers);
router.patch("/users/:id/role", ctrl.setUserRole);

router.get("/lessons",      ctrl.listLessons);
router.post("/lessons",     ctrl.createLesson);
router.patch("/lessons/:id",ctrl.updateLesson);
router.delete("/lessons/:id",ctrl.deleteLesson);

router.get("/problems",     ctrl.listProblems);
router.post("/problems",    ctrl.createProblem);
router.patch("/problems/:id",ctrl.updateProblem);
router.delete("/problems/:id",ctrl.deleteProblem);

router.get("/submissions",  ctrl.getAllSubmissions);
router.get("/savedcodes",   ctrl.getAllSavedCodes);
router.get("/engagement",   ctrl.getEngagementConfigAdmin);
router.put("/engagement",   ctrl.upsertEngagementConfigAdmin);

module.exports = router;