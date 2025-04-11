import { useState, useEffect, lazy, Suspense } from "react";

import AppBar from "./components/AppBar/AppBar.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
const LoginPage = lazy(() =>
  import("./components/pages/LoginPage/LoginPage.jsx")
);
// import LoginPage from "./components/pages/LoginPage/LoginPage.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";

// import users from "./contacts.json";
import { useDispatch, useSelector } from "react-redux";
// import {
//   addContact,
//   deleteContact,
//   fetchContacts,
// } from "./redux/contacts/operations.js";
import Loader from "./components/Loader/Loader.jsx";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "./redux/contacts/selectors.js";
const HomePage = lazy(() => import("./components/pages/HomePage/HomePage.jsx"));
// import HomePage from "./components/pages/HomePage/HomePage.jsx";
const RegistrationPage = lazy(() =>
  import("./components/pages/RegistrationPage/RegistrationPage.jsx")
);
// import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

const ContactsPage = lazy(() =>
  import("./components/pages/ContactsPage/ContactsPage.jsx")
);
// import ContactsPage from "./components/pages/ContactsPage/ContactsPage.jsx";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "./redux/auth/selectors.js";
import { refreshUser } from "./redux/auth/operations.js";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const contacts = useSelector(selectContacts);

  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <>
      {isRefreshing ? (
        <p>Please, wait ...... loading</p>
      ) : (
        <div>
          {/* <AppBar />
          <hr /> */}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/register"
                  element={
                    <RestrictedRoute
                      component={<RegistrationPage />}
                      redirectTo="/contacts"
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RestrictedRoute
                      component={<LoginPage />}
                      redirectTo="/contacts"
                    />
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute
                      component={
                        <ContactsPage>
                          <div>
                            <h1>Phonebook</h1>
                            <ContactForm />
                            <SearchBox />
                            {isLoading && !error && <Loader />}
                            {error && (
                              <p style={{ fontSize: "40px" }}>{error}</p>
                            )}
                            {contacts.length > 0 && <ContactList />}
                          </div>
                        </ContactsPage>
                      }
                      redirectTo="/login"
                    />
                  }
                />
                <Route path="*" element={<HomePage />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
