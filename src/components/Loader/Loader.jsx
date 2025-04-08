import css from "./Loader.module.css";
import RingLoader from "react-spinners/RingLoader";
export default function Loader() {
  return (
    <>
      <RingLoader
        size={60}
        color="#fff"
        // loading={true}
        className={css.loader}
      />
    </>
  );
}
