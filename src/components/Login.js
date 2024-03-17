import React, { useState } from "react";
import "./TableUser.scss";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-container col-12 col-sm-4">
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

      <button className={email && password ? "active" : ""} disabled={!email || !password}>
        Log in
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i> Go back
      </div>
    </div>
  );
};
