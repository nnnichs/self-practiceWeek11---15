export function formatTimestamp(ts) {
  return new Date(ts).toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  })
}

export function formatShort(date) {
  return Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date))
}
