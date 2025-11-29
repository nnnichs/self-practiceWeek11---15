// Pure Function แบบ Week 6

function calculate(arr, callback) {
  return callback(arr);
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

export { calculate, sum };
