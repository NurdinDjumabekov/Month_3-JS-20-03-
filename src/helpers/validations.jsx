export const validNums = (text) => {
  const isValid = /^[0-9.]*$/.test(text);
  return !isValid;
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

export const checkDates = (date_from, date_to) => {
  //// проверка на дату, если остался 1 день или дата прошла, то нельзя редактировать или доабвить заявку

  const today = new Date();

  // Обнуляем время для точного сравнения только по дате
  today?.setHours(0, 0, 0, 0);

  const fromDate = new Date(date_from);
  const toDate = new Date(date_to);

  fromDate?.setHours(0, 0, 0, 0);
  toDate?.setHours(0, 0, 0, 0);

  const differenceFromDate = fromDate - today;
  const differenceToDate = toDate - today;

  const oneDayInMs = 24 * 60 * 60 * 1000;

  // Проверяем, чтобы дата "от" была как минимум завтрашней
  if (
    differenceFromDate <= 0 || // если "от" на сегодня или раньше
    differenceToDate < 0 // если "до" на сегодня или раньше
  ) {
    return true; // Нельзя добавить заявку
  }

  return false; // Можно добавить заявку на завтрашний день или позже
};
