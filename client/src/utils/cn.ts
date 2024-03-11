import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function cn(...className: classNames.ArgumentArray) {
  return twMerge(classNames(className));
}
