export function analyzeAll(tasks) {
  const total = tasks.length
  const pending = tasks.filter(t => t.status !== "done").length
  const done = tasks.filter(t => t.status === "done").length

  const titleLengths = tasks.map(t => t.title.length)
  const avg = titleLengths.length
    ? (titleLengths.reduce((a, b) => a + b) / titleLengths.length).toFixed(2)
    : 0

  const longestTitle = tasks.length
    ? tasks.reduce((a, b) => (a.title.length > b.title.length ? a : b)).title
    : "-"

  return { total, pending, done, longestTitle, avg }
}
