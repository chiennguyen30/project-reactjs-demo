import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Container } from "react-bootstrap";
import "./App.scss";
import { Bounce, ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import { TableUsers } from "./components/TableUsers";
import { Home } from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import { Login } from "./components/Login";

function App() {
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  });
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<TableUsers />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
