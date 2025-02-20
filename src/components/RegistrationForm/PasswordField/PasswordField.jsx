import css from "./PasswordField.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export default function PasswordField() {
  const [eyeOpen, setEyeOpen] = useState(true);

  const handleEyeToggle = () => {
    setEyeOpen(!eyeOpen);
  };

  return (
    <div className={css.eyerelative}>
      {eyeOpen ? (
        <>
          <button
            type="button"
            className={css.btnEye}
            onClick={handleEyeToggle}
          >
            <FiEyeOff size={19} className={css.eye} />
          </button>
          <Field
            type="password"
            name="password"
            className={css.field}
            placeholder="Password"
          />
        </>
      ) : (
        <>
          <button
            type="button"
            className={css.btnEye}
            onClick={handleEyeToggle}
          >
            <FiEye size={19} className={css.eye} />
          </button>
          <Field
            type="text"
            name="password"
            className={css.field}
            placeholder="Password"
          />
        </>
      )}

      <ErrorMessage
        name="password"
        className={css.errorMessage}
        component="span"
      />
    </div>
  );
}
