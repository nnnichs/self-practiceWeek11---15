const myDate3 = new Date(2025, 1, 2, 18, 15, 0, 150)

// 1
console.log(myDate3.toString())

// 2
console.log(myDate3.toISOString())

// 3
console.log(myDate3.toLocaleString())
console.log(
  myDate3.toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  })
)

// 4 Intl API
const formatter = Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Asia/Bangkok",
})
console.log(formatter.format(myDate3))

// resolvedOptions
const userPreference = Intl.DateTimeFormat().resolvedOptions()
console.log(userPreference.timeZone)
console.log(userPreference.locale)
