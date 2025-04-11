import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { BiSolidUser } from "react-icons/bi";
import css from "./UserMenu.module.css";
import { logOut } from "../../redux/auth/operations";

export default function UserMenu() {
  const dispatch = useDispatch();
  const dataUser = useSelector(selectUser);
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.box}>
      <div className={css.box}>
        <div>
          <p className={css.valueUser}> {dataUser.name}</p>
          <p className={css.valueUser}> {dataUser.email}</p>
        </div>
        <BiSolidUser className={css.iconUser} />
      </div>
      <button className={css.logOut} onClick={handleLogOut}>
        LogOut
      </button>
    </div>
  );
}
