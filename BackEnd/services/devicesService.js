// Soft delete only. Records remain for audit and history.
function softDeleteDevice(deviceId) {
  const deletedAt = new Date().toISOString();

  // NOTE: This is a placeholder. Replace with real DB update:
  // - devices set is_deleted=true, deleted_at=now()
  return {
    deviceId,
    isDeleted: true,
    deletedAt,
  };
}

module.exports = {
  softDeleteDevice,
};
