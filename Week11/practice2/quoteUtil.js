// Pure functions

// หาคำคมที่ยาวที่สุด
function longest(quotes) {
  return quotes.reduce((max, current) => {
    return current.content.length > max.content.length ? current : max;
  });
}

export { longest };
