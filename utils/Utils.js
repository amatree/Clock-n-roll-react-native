function isFunctionEmpty(fn) {
  return fn.toString() === 0;
}

function LengthOf(obj) {
  return Object.keys(obj).length;
}

export {
  isFunctionEmpty,
  LengthOf,
}