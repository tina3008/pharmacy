import css from "./Filters.module.css";
// import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {  setStatusFilter } from "../../redux/filters/slice";
import {
  selectFilter,
  selectCategories,
} from "../../redux/products/selectors.js";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/products/operations.js";

export default function Categories(){

  const { setFieldValue, values } = useFormikContext();
  const [field] = useField("category");
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFilterChange = (field, value) => {
    setFieldValue(field, value);
    dispatch(setStatusFilter({ [field]: value }));
  };

    const categoryOptions = [
      { value: "", label: "Product category" },
      ...categoriesList.map((category) => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
      })),
    ];

  //   const isVerbSelected = addRadio ? "verb" : values.category === "verb";

  return (
    <>
      {/* <p>category</p> */}
       <div className={css.filterItem}>
         {categories.length && ( 
          <Select 
            options={categoryOptions}
            className={className}
            styles={CustomStyles()}
            value={categoryOptions.find(
              (option) => option.value === values.category
            )}
            onChange={(selected) =>
              handleFilterChange("category", selected.value)
            }
          />
        )}
      </div>
     
    </>
  );
}
