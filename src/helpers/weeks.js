import {
  startOfWeek,
  endOfWeek,
  format,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { ru } from "date-fns/locale";

export const getMyWeek = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Начало недели (понедельник)
  const end = endOfWeek(date, { weekStartsOn: 1 }); // Конец недели (воскресенье)
  return {
    date_from: format(start, "yyyy-MM-dd", { locale: ru }),
    // Форматируем дату начала недели
    date_to: format(end, "yyyy-MM-dd", { locale: ru }),
    // Форматируем дату конца недели
  };
};

export const getMonthRange = (date) => {
  const start = startOfMonth(date); // Начало месяца
  const end = endOfMonth(date); // Конец месяца
  return {
    date_from: format(start, "yyyy-MM-dd", { locale: ru }),
    // Форматируем дату начала месяца
    date_to: format(end, "yyyy-MM-dd", { locale: ru }),
    // Форматируем дату конца месяца
  };
};

export const getDaysOfCurrentMonth = () => {
  /// список дней целого месяца
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Нумерация месяцев начинается с 0, поэтому текущий месяц уже корректен

  // Получаем количество дней в текущем месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysList = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = String(day).padStart(2, "0"); // Добавляем ведущий 0 для дней от 1 до 9
    const formattedMonth = String(month + 1).padStart(2, "0"); // Месяц с ведущим 0

    daysList?.push(`${year}-${formattedMonth}-${formattedDay}`);
  }

  const listDeta = daysList?.map((i) => {
    return { value: i, label: i };
  });

  return listDeta;
};
