function hexToRgba(hex, opacity) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(result[1], 16)},${parseInt(
    result[2],
    16
  )},${parseInt(result[3], 16)},${opacity})`;
}

module.exports = {
  hexToRgba
}
