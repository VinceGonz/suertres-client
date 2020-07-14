import React from "react";
import { useState, useContext } from "react";

import FlashMessage from "../components/FlashMessage";

import { UserContext } from "../context/UserContext";
import { BetContext } from "../context/BetContext";

import { withRouter } from "react-router-dom";

const LoginForm = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, isAuthenticated } = useContext(UserContext);
  const { flashMsg, setFlashMsg } = useContext(BetContext);

  const onSubmit = async () => {
    console.log({ username, password });
    loginUser({ username, password });

    if ((await loginUser({ username, password })) === undefined) {
      setFlashMsg({ msgType: "danger", msgText: "Invalid Username/Password" });
    }

    if (isAuthenticated) {
      history.push("/dashboard");
    } else {
    }
  };
  return (
    <div className="loginContainer">
      <div className="login-box">
        {flashMsg.msgType ? <FlashMessage flashMsg={flashMsg} /> : null}
        <h1 className="login-title">Secured Login</h1>
        <div className="Login-group">
          <div className="login-field-group">
            <label htmlFor="">Username</label>
            <div>
              <input
                className="login-input-field"
                type="text"
                name=""
                placeholder=" Enter Username here..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="login-field-group">
            <label htmlFor="">Password</label>
            <div>
              <input
                className="login-input-field"
                type="password"
                name=""
                placeholder=" Enter Password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login-field-group">
            <button className="loginBtn" onClick={() => onSubmit()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
