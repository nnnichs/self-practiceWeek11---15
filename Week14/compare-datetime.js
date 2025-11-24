const openTime = new Date("2025-11-19T12:00:00")
const closeTime = new Date("2025-11-20T12:00:00")
const aTime = new Date("2025-11-19T12:00:00")

if (openTime < closeTime) console.log("opentime comes before closetime")
else console.log("opentime comes after closetime")

if (openTime === aTime) console.log("same reference")
else console.log("different reference")

if (openTime.getTime() === aTime.getTime())
  console.log("both openTime and aTime are the same")
