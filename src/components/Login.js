import { useState } from "react";
import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser, login } from "../features/addUsers";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.userRecords.usersDetail);
  const [signupData, setSignpuData] = useState({
    userName: "",
    email: "",
    pswd: "",
  });
  const [loginData, setLoginData] = useState({ email: "", pswd: "" });
  const clear = { userName: "", email: "", pswd: "" };

  function handleSignupChange(e) {
    setSignpuData({ ...signupData, [e.target.name]: e.target.value });
  }
  function handleLoginChanges(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    dispatch(addUser(signupData));
    setSignpuData(clear);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const wantToLoging = usersData?.filter(
      (record) =>
        record.email === loginData.email && record.pswd === loginData.pswd
    );
    if (wantToLoging?.length > 0) {
      dispatch(login(wantToLoging));
      navigate("/home");
    } else {
      alert("wrong email or password");
    }
  };

  return (
    <>
      <div className="l-s-container">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup">
            <form
              className="signup-form"
              onSubmit={(e) => {
                handleSignup(e);
              }}
            >
              <label className="s-lable" htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                value={signupData.userName}
                className="input"
                type="text"
                name="userName"
                placeholder="User name"
                required=""
                onChange={(e) => {
                  handleSignupChange(e);
                }}
              />
              <input
                value={signupData.email}
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                required=""
                onChange={(e) => {
                  handleSignupChange(e);
                }}
              />
              <input
                value={signupData.pswd}
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                onChange={(e) => {
                  handleSignupChange(e);
                }}
              />
              <button
                className="s-l-btn"
                onClick={(e) => {
                  handleSignup(e);
                }}
              >
                Sign up
              </button>
            </form>
          </div>
          <div className="login">
            <form
              className="login-form"
              onSubmit={(e) => {
                handleLogin(e);
              }}
            >
              <label className="s-lable" htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                value={loginData.email}
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                required=""
                onChange={(e) => {
                  handleLoginChanges(e);
                }}
              />
              <input
                value={loginData.pswd}
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                onChange={(e) => {
                  handleLoginChanges(e);
                }}
              />
              <button
                className="s-l-btn"
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
