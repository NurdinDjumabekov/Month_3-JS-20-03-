import { toast } from "react-toastify";

export const myAlert = (message, type = "info") => {
  toast?.[type]?.(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
  });
};
