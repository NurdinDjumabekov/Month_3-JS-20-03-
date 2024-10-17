export const totalSum = (list, count, keyPrice) => {
  return list?.reduce((total, item) => {
    return +total + +item?.[keyPrice] * +item?.[count];
  }, 0);
};

export const sumCountsFN = (list, keyCount) => {
  return list?.reduce((prev, item) => +prev + +item?.[keyCount], 0);
};

export const sumByKey = (list, key) => {
  return list?.reduce((total, item) => {
    return +total + +item?.[key];
  }, 0);
};

export const roundingNum = (count) => {
  ///// округления числа
  /// если больше 0, то округлять до 1го числа, а если его нет, то выводится просто целое число без 0
  return +count % 1 === 0 ? +count?.toFixed(0) : +count?.toFixed(1);
};

// Функция для перевода градусов в радианы
const deg2rad = (deg) => deg * (Math.PI / 180);

// Функция для расчета расстояния между двумя точками по формуле гаверсина
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Радиус Земли в километрах
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
