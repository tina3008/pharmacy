import React from "react";
import { ErrorMessage } from "formik";
import css from "./CustomMessage.module.css"


export default function CustomMessage({ name, errors, touched }) {
  return (
    <>
      {errors && touched && (
        <ErrorMessage name={name}>
          {(msg) => (
            <span className={css.errorMessage}>
              <svg width="16" height="16" className={css.signalDot}>
                <use href="/sprite.svg#icon-error"></use>
              </svg>
              {msg}
            </span>
          )}
        </ErrorMessage>
      )}

      {touched && !errors && (
        <span className={css.successMessage}>
          <svg width="16" height="16" className={css.signalDot}>
            <use href="/sprite.svg#icon-success"></use>
          </svg>
          Succsess {name}!
        </span>
      )}
    </>
  );
}
