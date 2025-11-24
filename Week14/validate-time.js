const openTime = new Date("2025-11-19T12:00:00")
const closeTime = new Date("2025-11-20T12:00:00")

const myBookingTime = new Date("2025-11-19T11:59:59")

if (myBookingTime >= openTime && myBookingTime <= closeTime)
  console.log("valid booking time")
else console.log("invalid booking time")
