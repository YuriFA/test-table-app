export function rgb(hexColor) {
  return hexColor.match(/\w\w/g).map(hex => parseInt(hex, 16));
}

export function randomInRange(min, max) {
  return min + (Math.random() * (max - min));
}

export function randomHexColor(min = '#000000', max = '#FFFFFF') {
  const minRgb = rgb(min);
  const maxRgb = rgb(max);

  const resultRgb = [];
  for (let i = 0; i < 3; i++) {
    resultRgb[i] = Math.floor(randomInRange(minRgb[i], maxRgb[i]));
  }

  return `#${resultRgb
    .map(n => n.toString(16))
    .map(hex => '00'.slice(hex.length) + hex)
    .join('')}`;
}

