import React, { useEffect, useState } from "react";
import "./TableUser.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dataAcount = useSelector((state) => state.user.dataAcount);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter your email end password");
      return;
    }

    dispatch(handleLoginRedux(email, password));
  };

  const BackHome = () => {
    navigate("/");
  };

  const handlePressEnter = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (dataAcount && dataAcount.auth === true) {
      navigate("/");
    }
  }, [dataAcount]);
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title-login">Log in</div>
      <div className="text-email">Email or username(eve.holt@reqres.in)</div>
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="text-password">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e)}
        />
        {showPassword ? (
          <i className="fa-regular fa-eye-slash" onClick={togglePasswordVisibility}></i>
        ) : (
          <i className="fa-regular fa-eye" onClick={togglePasswordVisibility}></i>
        )}
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={!email || !password}
        onClick={() => handleLogin()}
      >
        {isLoading && <i className="fa-solid fa-sync fa-spin"></i>} &nbsp; Log in
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i> <span onClick={() => BackHome()}>Go Back</span>
      </div>
    </div>
  );
};
