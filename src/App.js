import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Container } from "react-bootstrap";
import "./App.scss";
import { Bounce, ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import { AppRoute } from "./routes/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  });
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
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
