export const transformDate = (date) => {
  ///  2024-03-20T15:52:58.843Z  ===>  20.03.2024
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};

export const transformDateTime = (dateString) => {
  ///  Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)  ===>  2024-08-07 17:12
  const date = new Date(dateString);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");

  const hours = String(date?.getHours())?.padStart(2, "0");
  const minutes = String(date?.getMinutes())?.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const transformActionDate = (dateString) => {
  ///  Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)  ===>  2024-08-07
  const date = new Date(dateString);

  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const reverseTransformActionDate = (dateString) => {
  ///  2024-08-07 ==> Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)
  if (!dateString || typeof dateString !== "string") return null;

  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  if (isNaN(date)) {
    return null;
  }
  return date;
};

export const reverseTransformActionTime = (dateString) => {
  //// 2024-08-07  17:12 ===> Wed Aug 07 2024 17:12:26 GMT+0600 (Киргизия)

  if (!dateString || typeof dateString !== "string") return null;

  const [datePart, timePart] = dateString?.split(" ");
  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart?.split("-");
  const [hours, minutes] = timePart?.split(":");

  if (!year || !month || !day || !hours || !minutes) return null;

  // Создаем объект даты
  const date = new Date(year, month - 1, day, hours, minutes);

  // Проверяем, является ли созданный объект валидным
  if (isNaN(date)) {
    console.error("Invalid date generated from input:", dateString);
    return null;
  }

  return date;
};

export const transformDates = (dateString) => {
  ///  Mon Apr 01 2019 20:29:00 GMT+0600  ===>  01.04.2019
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  const formattedDate = date?.toLocaleDateString("ru-RU", options);
  return formattedDate;
};

export const transformTime = (dateString) => {
  ///  Mon Apr 01 2019 20:29:00 GMT+0600  ===>  17:12
  const date = new Date(dateString);
  const hours = date?.getHours()?.toString()?.padStart(2, "0");
  const minutes = date?.getMinutes()?.toString()?.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const extractTimeFromDateTime = (dateTimeString) => {
  /// 2024-09-26 14:36 ====> 14:36
  if (!dateTimeString || typeof dateTimeString !== "string") return null;
  const [datePart, timePart] = dateTimeString?.split(" ");
  if (!datePart || !timePart) return null;
  return timePart;
};

export const reverseExtractTimeFromDateTime = (timeString) => {
  /// 14:36 ====> 2024-09-26 14:36
  if (!timeString || typeof timeString !== "string") return null;
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(timeString)) return null;
  return `2024-09-26 ${timeString}`;
};

export const generateNowWeek = () => {
  //// генерирую дату этой недели
  const now = new Date();

  const currentDay = now?.getDay();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(
    now?.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );
  startOfWeek.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

  const endOfWeek = new Date(startOfWeek);
  endOfWeek?.setDate(startOfWeek?.getDate() + 6);
  endOfWeek?.setHours(23, 59, 59, 999); // Устанавливаем время на конец дня

  const formatDate = (date) => date?.toISOString()?.split("T")[0];

  return {
    date_from: formatDate(startOfWeek),
    date_to: formatDate(endOfWeek),
  };
};

export const extractEndTime = (timeRange) => {
  //// 11:00 - 12:00 ====> 11:00
  const parts = timeRange?.split(" - ");

  if (parts?.length === 2) {
    return parts[1]?.trim();
  }
};

export const addDateFN = (date) => {
  //// 2024-09-11 ====> 2024-09-11 11:00 и 2024-09-11 12:00
  if (!date) return "";

  const num = Math?.floor(Math?.random() * (19 - 9 + 1)) + 10;

  const date_from = `${date} ${num}:00`;
  const date_to = `${date} ${num + 1}:00`;

  return { date_from, date_to };
};

export const addToDateFN = (dateTime) => {
  //// 2024-09-11 10:00 ====> 2024-09-11 11:00
  if (!dateTime) return "";

  const [date, time] = dateTime?.split(" ");
  const [hours, minutes] = time?.split(":").map(Number);

  // Увеличиваем время на один час
  const newHours = hours + 1;

  const date_to = `${date} ${newHours?.toString()?.padStart(2, "0")}:${minutes
    ?.toString()
    ?.padStart(2, "0")}`;

  return date_to;
};

export const formatDateMonth = (dateString) => {
  ///// 2024-09-13 => "13 сентября 2024 года"
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const date = new Date(dateString);
  const day = date?.getDate();
  const month = months?.[date?.getMonth()];
  const year = date?.getFullYear();

  return `${day} ${month} ${year} года`;
};

export const formatDateOnly = (dateTimeString) => {
  return dateTimeString?.split(" ")[0]; // Разделяем строку по пробелу и возвращаем только первую часть (дату)
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Месяц от 0 до 11, поэтому добавляем 1
  const day = String(today.getDate()).padStart(2, "0"); // Добавляем ведущий 0 для дней от 1 до 9

  return `${year}-${month}-${day}`;
};

export const getMyGeo = () => {
  ///// get my geo
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        }
      );
    } else {
      const error = new Error("Geolocation is not supported by this browser.");
      console.error(error.message);
      reject(error);
    }
  });
};
