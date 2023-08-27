import Toastify from "npm:toastify-js";

export function ErrorToast(text: string) {
  return Toastify({
    text: text,
    duration: 3000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(135deg, #ff6b6b, #e63946)",
    },
  }).showToast();
}

export function SuccessToast(text: string) {
  return Toastify({
    text: text,
    duration: 3000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(135deg, #60a564, #3c8c40)",
    },
  }).showToast();
}
