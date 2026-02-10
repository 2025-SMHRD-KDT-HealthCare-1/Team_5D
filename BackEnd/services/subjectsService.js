// Soft delete only. Records remain for audit and history.
function softDeleteSubject(subjectId) {
  const deletedAt = new Date().toISOString();

  // NOTE: This is a placeholder. Replace with real DB update:
  // - subjects set is_deleted=true, deleted_at=now()
  // - devices linked to subject also soft deleted
  return {
    subjectId,
    isDeleted: true,
    deletedAt,
    devicesDeleted: true,
  };
}

module.exports = {
  softDeleteSubject,
};
