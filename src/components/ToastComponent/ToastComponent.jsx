import toast, { Toaster } from "react-hot-toast";

export const showSuccess = ({ message }) => {
  toast(message, {
    style: {
      background: "var(--text-color-white)",
      color: "#3CBF61",
      borderColor: "#3CBF61",
    },
    position: "top-center",
  });
};

export const showError = ({ message }) => {
  toast(message, {
    style: {
      background: "var(--border-color_error)",
      color: "var(--text-color-white)",
    },
    position: "top-center",
  });
};

export const showInfo = ({ message }) => {
  toast(message, {
    style: { background: "white", color: "black" },
    position: "top-center",
  });
};