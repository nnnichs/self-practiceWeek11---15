// 1. Empty → current datetime (UTC format)
const today1 = new Date()
console.log(today1)

// 2. Using milliseconds
const now = new Date(Date.now())
console.log(now)

// 3. Using date string
const myDate1 = new Date("2025-05-02T17:15:35.100")
console.log(myDate1)

const myDate2 = new Date("2025-05-02T17:15:35.100Z")
console.log(myDate2)

// 4. Using parameters (YYYY, monthIndex, day, hh, mm, ss, ms)
const myDate3 = new Date(2025, 1, 2, 18, 15, )
