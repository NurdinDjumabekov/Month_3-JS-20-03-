export const searchActiveOrdersTA = (list) => {
  /// возвращаю массив с guid агентов, которые аrтивные на главной странице (bool = true)
  return list?.filter((i) => i?.is_checked == 1)?.map((i) => i?.guid) || [];
};
/// checkcheck