import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
  const filterValue = useSelector(selectFilteredContacts);

  return (
    <div className={css.contactList}>
      {filterValue.map((el) => (
        <Contact key={el.id} user={el} />
      ))}
    </div>
  );
}
// const filteredContacts = useMemo(() => {
//   console.log("searchName:", searchName);
//   console.log("contacts:", contacts);
//   if (!searchName.trim()) return contacts;

//   const filtered = contacts.filter((el) => {
//     console.log(el.name);
//     console.log(searchName);
//     const valueEl = el.name.toLowerCase().includes(searchName.toLowerCase());
//     console.log(valueEl);
//     return valueEl;
//   });
//   console.log("filteredContacts:", filtered);
//   return filtered;
// }, [contacts, searchName]);
