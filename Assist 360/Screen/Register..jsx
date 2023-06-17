import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Head from "../Components/Head";
import Bottom from "../Components/Bottom";
import Alert_ from "../Components/alert";

const Register = () => {
  const nav = useNavigate();
  const [Name, setname] = useState("");
  const [Password, setpassword] = useState("");
  const [RePassword, setrepassword] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alt, setalt] = useState();
  const [malt, setmalt] = useState();
  const [Email, setemail] = useState("sheikmo2425v@gmail.com ");

  const validateEmail = () => {
    const regex = /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;
    return regex.test(Email);
  };
  const register = () => {
    if (Name !== "" && Email !== "" && Password !== "" && RePassword !== "") {
      if (validateEmail()) {
        setError2("");
        if (
          validator.isStrongPassword(Password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          setErrorMessage("");
          if (Password !== RePassword) {
            setError("Passwords do not match");
            return;
          } else {
            setError("");
            var k = { Name: Name, Password: Password, Email: Email };

            axios
              .post("http://127.0.0.1:5000/Assist/signup", k)
              .then((Response) => {
                if (Response.data === "Account created successfully") {
                  setmalt(Response.data);

                  setname("");
                  setpassword("");
                  setemail("");
                  setrepassword("");
                  setError("");
                  setErrorMessage("");
                } else {
                  setalt(Response.data);
                }
              })
              .catch((e) => {
                setalt("Server Error");
              });
          }
        } else {
          setErrorMessage("Is Not Strong Password");
        }
      } else {
        setError2("Please Enter valid Email");
      }
    } else {
      setalt("please fill all fields");
    }
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
        {malt && (
          <div onClick={() => (setmalt(), nav("/Login"))}>
            <Alert_ msg={malt} />
          </div>
        )}
        <div className="center">
          {" "}
          <div className="L_R">
            <h5>Registration</h5>
            <hr />
            <label htmlFor="Name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="form-control input"
              id="Name"
              value={Name}
              onChange={(e) => setname(e.target.value)}
            />
            <br />{" "}
            <label htmlFor="Email">
              <b>Email ID</b>
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              className="form-control input"
              id="Email"
              value={Email}
              onChange={(e) => setemail(e.target.value)}
            />{" "}
            {error2 === "" ? null : (
              <span style={{ color: "red" }}>{error2}</span>
            )}
            <br />
            <label htmlFor="psd">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="form-control input"
              value={Password}
              id="psd"
              onChange={(e) => setpassword(e.target.value)}
            />
            {errorMessage === "" ? null : (
              <span style={{ color: "red" }}>{errorMessage}</span>
            )}
            <br />
            <label htmlFor="rpsd">
              <b>Retype-Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter your Password again"
              className="form-control input"
              id="rpsd"
              value={RePassword}
              onChange={(e) => setrepassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <br />
            <button className="cbtn" onClick={register}>
              Register
            </button>
            <br />
            <button className="btn" onClick={() => nav("/Login")}>
              Login
            </button>
          </div>
        </div>
        <Bottom />
      </div>
    </>
  );
};

export default Register;
