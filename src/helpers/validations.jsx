export const validNums = (text) => {
  const isValid = /^[0-9.]*$/.test(text);
  return !isValid;
};

export const chechEmptyCount = (list) => {
  // Проверка, является ли count пустым или равным нулю
  return (
    list?.some(
      (item) =>
        (item?.count == "" && item?.is_checked) ||
        (item?.count == 0 && item?.is_checked)
    ) || false
  );
};

export const emptyCountCheck = (list) => {
  // Проверка, является ли count пустым или равным нулю
  return list?.some((item) => item?.count == "" || item?.count == 0) || false;
};

export const checkBoolFN = (list) => {
  // есть ли в массиве хотя бы один объект с ключом is_checked = true
  const hasCheckedItem = list?.some((item) => item?.is_checked === true);
  return !hasCheckedItem;
};

export const checkEditInputs = (list) => {
  const hasCheckedItem = list?.some((item) => item?.my_status === true);

  return hasCheckedItem;
};

export const checkIsFile = (fileUrl) => {
  // Извлекаем расширение файла из URL
  const extension = fileUrl?.split(".")?.pop()?.toLowerCase();

  // Массив расширений для фотофайлов
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

  // Массив расширений для видеофайлов
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

  // Проверяем тип файла
  if (videoExtensions.includes(extension)) {
    return "video";
  } else if (imageExtensions.includes(extension)) {
    return "image";
  } else {
    return "unknown"; // Если тип файла не определён
  }
};

const kyrgyzPhoneRegex = /^0\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$/;

export const checkNum = (value) => {
  if (!kyrgyzPhoneRegex?.test(value)) {
    return true;
  }
};
