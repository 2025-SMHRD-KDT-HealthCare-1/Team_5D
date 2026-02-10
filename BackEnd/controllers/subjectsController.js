const subjectsService = require("../services/subjectsService");

// Soft delete subject (no hard delete)
function deleteSubject(req, res, next) {
  try {
    const { subject_id: subjectId } = req.params;
    const result = subjectsService.softDeleteSubject(subjectId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  deleteSubject,
};
