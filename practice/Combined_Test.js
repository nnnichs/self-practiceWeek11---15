import { isValidDeadline } from "./utils/dateUtils.js"
import { analyzeAll } from "./utils/analytics.js"

//TEST DATE 
console.log("DATE TESTS")
console.log(isValidDeadline("2099-01-01T00:00")) // true
console.log(isValidDeadline("2000-01-01T00:00")) // false

// TEST ANALYTICS 
console.log("ANALYTICS TEST")

const mock = [
  { id: 1, title: "Study", status: "pending" },
  { id: 2, title: "Buy food", status: "done" },
  { id: 3, title: "Clean room", status: "pending" },
]

console.log(analyzeAll(mock))
