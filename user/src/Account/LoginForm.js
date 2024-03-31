import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../assets/SVG/loginImg.jpg";
import { AccountContext } from "./AccountContext";
import Axios from "axios";

const Login = () => {
  const { switchToSignup } = useContext(AccountContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //  Object Destructuring
  const { email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Insert Customer Records
  const submitLoginAccount = async (e) => {
    // prevent refresh
    e.preventDefault();
    try {
      //e.target.reset();
      const res = await Axios.get(
        `http://localhost:3001/api/v1/department/account/${user.email}/${user.password}`
      );
      if (res.status === 200) {
        setUser({
          email: "",
          password: "",
        });
        alert("LOGIN IS SUCCESSFUL!");
        navigate("/", { state: { account: "login" } });
      }
    } catch (err) {
      alert("EMAIL OR PASSWORD IS NOT FOUND!");
      console.log(err);
    }
  };

  return (
    <section
      class="vh-100"
      style={{
        background: "#FFFAFA",
      }}
    >
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div
              class="card"
              style={{ borderRadius: "1rem", backgroundColor: "#F9F9F8" }}
            >
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={imgLogin}
                    alt="login form"
                    class="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    {/*FORM CONTROL*/}
                    <form onSubmit={submitLoginAccount}>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <i
                          class="fas fa-print fa-2x me-3"
                          style={{ color: "#CD295A" }}
                        ></i>
                        <span class="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Login your account
                      </h5>

                      {/*Email Input*/}
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          class="form-control"
                          name="email"
                          value={email}
                          onChange={(e) => onInputChange(e)}
                        />
                        <label class="form-label" for="form3Example3">
                          Email address
                        </label>
                      </div>

                      {/*Password Input*/}
                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          class="form-control"
                          name="password"
                          value={password}
                          onChange={(e) => onInputChange(e)}
                        />
                        <label class="form-label" for="form3Example4">
                          Password
                        </label>
                      </div>

                      {/*Button Submit Signup*/}
                      <div class="pt-1 mb-4">
                        <button
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      {/*CheckBox Policy*/}
                      <div class="form-check d-flex justify-content-center mb-3">
                        <p class="medium text-muted" role={"button"}>
                          Forgot password?
                        </p>
                      </div>

                      {/*Link to Sign up*/}
                      <p
                        class="mb-5 pb-lg-2 text-center"
                        style={{ color: "#393f81" }}
                      >
                        Don't have an account?{" "}
                        <Link
                          to={""}
                          style={{ color: "#393f81" }}
                          onClick={switchToSignup}
                        >
                          Register here
                        </Link>
                      </p>

                      {/*Link to Login with Social Media*/}
                      <div class="text-center">
                        <p> Terms of use.</p>
                        <p> Privacy policy.</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
