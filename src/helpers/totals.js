export const roundingNum = (count) => {
  ///// округления числа
  /// если больше 0, то округлять до 1го числа, а если его нет, то выводится просто целое число без 0
  return +count % 1 == 0 ? +count?.toFixed(0) : +count?.toFixed(1);
};
