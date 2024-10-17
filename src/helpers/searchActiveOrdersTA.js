export const searchActiveOrdersTA = (list) => {
  /// возвращаю массив с guid агентов, которые аrтивные на главной странице (bool = true)
  return list?.filter((i) => i?.is_checked == 1)?.map((i) => i?.guid) || [];
};

// export const searchActiveOrdersTA = (list) => {
//   /// возвращаю массив с guid агентов, которые аrтивные на главной странице (bool = true)
//   const asdas = list?.filter((i) => !!!i?.bool)?.map((i) => i?.guid) || [];
//   return [...asdas, "B3120F36-3FCD-4CA0-8346-484881974846"];
// };
// /// check

export const chechListOrders = (list, product_guid) => {
  const isCheck = list?.some((item) => item?.product_guid === product_guid);
  return isCheck;
};

export const formatName = (fullName) => {
  const nameParts = fullName?.trim()?.split(" ");

  if (nameParts.length === 3) {
    const [lastName, firstName, middleName] = nameParts;
    return `${lastName} ${firstName?.charAt(0)}. ${middleName?.charAt(0)}.`;
  } else if (nameParts.length === 2) {
    const [lastName, firstName] = nameParts;
    return `${lastName} ${firstName?.charAt(0)}.`;
  } else {
    return fullName;
  }
};
