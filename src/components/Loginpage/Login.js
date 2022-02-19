import React, { useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../constant/toast";
import Axios from "../../constant/axios";

const Loginpage = () => {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ mobile: "", password: "" });
  const submitHandler = () => {
    Axios.post("/auth/login", details).then((res) => {
      console.log(res.data);
      if (res.data.status) successToast();
      else errorToast(res.data.message);
    });
  };

  return (
    <div className="login-main">
      <div className="login-mainbox">
        <h2>LOGIN</h2>

        <div className="login-textbox1">
            
          <input
            type="number"
            name="phone"
            id="phone"
            onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
            value={details.mobile}
          />
        </div>
        <div className="login-textbox2">
            
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <div className="login-btn">
          <button onClick={submitHandler}>LOGIN</button>
        </div>
        <div className="fpass">
            <h4>Sign-up</h4>
          <h3>Forgot password</h3>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Loginpage;