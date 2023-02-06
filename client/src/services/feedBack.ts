import { toast } from "react-toastify";

export function sendSuccessMessage(message: string) {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function sendErrorMessage(message: string) {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
}
