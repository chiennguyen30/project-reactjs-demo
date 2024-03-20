import React, { useState, useContext } from "react";
import { LoginApi } from "../services/UserService";
import "./TableUser.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export const Login = () => {
  const { LoginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter your email end password");
      return;
    }
    setShowLoading(true);
    let res = await LoginApi(email, password);
    if (res && res.token) {
      LoginContext(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setShowLoading(false);
  };

  const BackHome = () => {
    navigate("/");
  };
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
        />
        {showPassword ? (
          <i className="fa-regular fa-eye-slash" onClick={togglePasswordVisibility}></i>
        ) : (
          <i class="fa-regular fa-eye" onClick={togglePasswordVisibility}></i>
        )}
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={!email || !password}
        onClick={() => handleLogin()}
      >
        {showLoading && <i className="fa-solid fa-sync fa-spin"></i>} &nbsp; Log in
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i> <span onClick={() => BackHome()}>Go Back</span>
      </div>
    </div>
  );
};
