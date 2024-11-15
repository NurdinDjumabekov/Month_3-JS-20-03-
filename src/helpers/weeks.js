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
