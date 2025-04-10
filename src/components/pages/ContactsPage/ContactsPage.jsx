import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../../redux/contacts/operations";
fetchContacts;
export default function ContactsPage({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return <>{children}</>;
}
