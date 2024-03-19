import React, { useEffect, useState } from "react";
import { LoginApi } from "../services/UserService";
import "./TableUser.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });
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
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setShowLoading(false);
  };
  return (
    <div className="login-container col-12 col-sm-4">
      <p>eve.holt@reqres.in</p>
      <div className="title-login">Log in</div>
      <div className="text-email">Email or username</div>
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
        <i className="fa-solid fa-angles-left"></i> Go back
      </div>
    </div>
  );
};
