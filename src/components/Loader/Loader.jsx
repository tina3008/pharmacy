
import css from "./Loader.module.css";
import { Oval
  
 } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className={css.loaderContainer}>

      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
   
    </div>
  );
}
