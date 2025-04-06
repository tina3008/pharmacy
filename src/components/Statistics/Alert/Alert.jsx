import clsx from "clsx";
import css from "./Alert.module.css";

export const Alert = ({ variant, children }) => {
  return <p className={clsx(css.alert, css[variant?.toLowerCase()])}>{children}</p>;
};

export const AlertAmount = ({ type, children }) => {
  return (  
    <p className={clsx(css.amount, css[type])}>{children}</p>
  );
};