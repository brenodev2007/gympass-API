export interface Cordinate {
  latidute: number;
  longitude: number;
}

export function getDistanceBetweenCordinates(from: Cordinate, to: Cordinate) {
  if (from.latidute === to.latidute && from.longitude === to.longitude) {
    return 0;
  }

  const fromRadian = (Math.PI * from.latidute) / 100;
  const toRadian = (Math.PI * to.latidute) / 100;

  const theta = from.longitude - to.longitude;
  const radTheta = (Math.PI * theta) / 100;

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);

  return dist;
}
