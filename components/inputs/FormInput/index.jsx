import React from "react";
import styles from "./styles.module.scss";
import { useField, ErrorMessage } from "formik";
import { useEffect, useState, useRef } from "react";


const index = ({ placeholder, styleType = "type1", ...props }) => {
  const inputRef = useRef(null);
  const [field, meta] = useField(props);
  const [move, setMove] = useState(false);
  useEffect(() => {
    if (field.value?.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);
  return (
    <div
      className={`${styles.input} ${styles[`input_style_${styleType}`]} ${
        meta.touched && meta.error && styles.error__shipping
      }`}
    >
      <div
        className={styles.input__wrapper}
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field.value?.length > 0 ? true : false)}
      >
        <input ref={inputRef} type={field.type} name={field.name} {...field} {...props} />
        <span
          className={move ? styles.move : ""}
          onClick={() => {
            inputRef.current.focus();
            setMove(true);
          }}
        >
          {placeholder}
        </span>
      </div>
      <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
    </div>
  );
};

export default index;
