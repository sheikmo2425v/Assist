import { useEffect, useState } from "react";
import Head from "../Components/Head";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bottom from "../Components/Bottom";
import Alert_ from "../Components/alert";
const Login = () => {
  const [Password, setpassword] = useState("");
  const [Email, setemail] = useState("");
  const [alt, setalt] = useState();
  const nav = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const check = () => {
    var k = { Email: Email, password: Password };

    axios.post("http://127.0.0.1:5000/Assist/login", k).then((Response) => {
      console.log(Response.data[1]);

      if (Response.data[1].length !== 0) {
        setemail("");
        setpassword("");
        localStorage.setItem("data", Response.data[1]);
        localStorage.setItem("role", Response.data[0]);
        if (Response.data[0] === "admin") {
          nav("/admin");
        } else {
          nav("/");
        }
      } else {
        setalt("No user found");
      }
    });
  };
  return (
    <>
      <div className="main">
        <div className="">
          <Head />
        </div>
        {alt && (
          <div onClick={() => setalt()}>
            <Alert_ msg={alt} />
          </div>
        )}
        <div className="center">
          <div className="L_R ">
            <h5>Login</h5>
            <hr />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter your Email"
              className="form-control input"
              id="email"
              value={Email}
              onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <label htmlFor="psd">
              <b>Password</b>
            </label>
            <br />
            <input
              type="password"
              className="form-control input"
              placeholder="Enter your Password"
              value={Password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <br />
            <button onClick={check} type="Submit" className="cbtn">
              Login
            </button>
            <br />
            <button className="btn" onClick={() => nav("/Register")}>
              Sign up
            </button>
          </div>
        </div>
        <Bottom />
      </div>
    </>
  );
};

export default Login;
