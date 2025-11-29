export function isValidDeadline(deadline) {
  const d = new Date(deadline)
  const now = new Date()
  return d > now
}
