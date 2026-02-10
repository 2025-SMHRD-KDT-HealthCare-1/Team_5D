const express = require("express");
const { deleteSubject } = require("../controllers/subjectsController");

const router = express.Router();

// DELETE /api/subjects/:subject_id
router.delete("/:subject_id", deleteSubject);

module.exports = router;
