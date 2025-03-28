import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../redux/filters/slice";
import { selectCategories, selectFilter } from "../../redux/products/selectors";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import {
  fetchCategories,
  fetchProducts,
} from "../../redux/products/operations.js";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);
  const categoriesList = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const fetchResultsDebounced = useCallback(
    debounce((name) => {
      dispatch(setStatusFilter({ name }));
    }, 300),
    [dispatch]
  );

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    category: Yup.string().oneOf(categoriesList).required("Required"),
  });

  const handleSubmit = (values, actions) => {
    fetchResultsDebounced(values.name);
    dispatch(setStatusFilter({ category: values.category }));
    dispatch(
      fetchProducts({
        category: values.category,
        name: values.name,
      })
    );
  };

  return (
    <Formik
      initialValues={{
        category: filters.category || "",
        name: filters.name || "",
      }}
      ValidationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.filtersBlock}>
        <div className={css.fieldPosition}>
          <Field
            as="select"
            name="category"
            placeholder="Product category"
            className={css.field}
          >
            <option value="" className={css.option}>
              Product category
            </option>
            {...categoriesList.map((category, index) => {
              return (
                <option key={index} value={category} className={css.option}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              );
            })}
          </Field>
          <IoIosArrowDown className={css.imgField} />
          <ErrorMessage
            name="category"
            component="span"
            className={css.errMessage}
          />
        </div>

        <div className={css.fieldPosition}>
          <Field
            type="text"
            name="name"
            placeholder="Search medicine"
            className={css.field}
          />
          <FiSearch className={css.imgField} />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errMessage}
          />
        </div>
        <button type="submit" className={css.filtersBtn}>
          <LuFilter className={css.iconBtn} />
          Filter
        </button>
      </Form>
    </Formik>
  );
}
