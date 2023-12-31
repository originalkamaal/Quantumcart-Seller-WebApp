import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../types";
import { RefObject, useEffect } from "react";

export const showToast = (
  message: string,
  type: "success" | "error" | "warning" | "info" | undefined,
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
};

export function decodeJwt(token: string | undefined): User | undefined {
  if (!token) {
    return undefined;
  }
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  return decodedToken as User;
}

type ClickOutsideHandler = () => void;

export const useOutsideAlerter = (
  ref: RefObject<HTMLElement>,
  onClickOutside: ClickOutsideHandler,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
export default useOutsideAlerter;
