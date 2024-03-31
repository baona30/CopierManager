import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../assets/SVG/loginImg.jpg";
import { AccountContext } from "./AccountContext";
import Axios from "axios";

const Signup = () => {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    departmentName: "",
    departmentNo: "",
    email: "",
    password: "",
  });

  //  Object Destructuring
  const { departmentName, departmentNo, email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Insert Customer Records
  const submitAccountRecord = async (e) => {
    // prevent refresh
    e.preventDefault();
    try {
      e.target.reset();
      const res = await Axios.post(
        "http://localhost:3001/api/v1/department/create",
        user
      );
      if (res.status === 200) {
        alert("Account Created Successfully");
        setUser({
          departmentName: "",
          departmentNo: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
      alert(
        "Status " +
          err.response.status +
          " : " +
          err.response.data.errors[0].msg
      );
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
                    <form onSubmit={submitAccountRecord}>
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
                        Sign up your account
                      </h5>

                      {/*Department's Name,Number Input*/}
                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Example1"
                              class="form-control"
                              name="departmentName"
                              value={departmentName}
                              onChange={(e) => onInputChange(e)}
                            />
                            <label class="form-label" for="form3Example1">
                              Department
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              id="form3Example2"
                              class="form-control"
                              name="departmentNo"
                              value={departmentNo}
                              onChange={(e) => onInputChange(e)}
                            />
                            <label class="form-label" for="form3Example2">
                              Number of Department
                            </label>
                          </div>
                        </div>
                      </div>

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
                          Sign Up
                        </button>
                      </div>

                      {/*CheckBox Policy*/}
                      <div class="form-check d-flex justify-content-center mb-3">
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example33"
                          checked
                        />
                        <label class="form-check-label" for="form2Example33">
                          Agree with Term of use & Private policy
                        </label>
                      </div>

                      {/*Link to Login*/}
                      <p
                        class="mb-4 pb-lg-2 text-center"
                        style={{ color: "#393f81" }}
                      >
                        Already have an account?{" "}
                        <Link
                          to={""}
                          style={{ color: "#393f81" }}
                          onClick={switchToSignin}
                        >
                          Sign in here
                        </Link>
                      </p>

                      {/*Link to Login with Social Media*/}
                      <div class="text-center">
                        <p>or sign up with:</p>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fab fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fab fa-google"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fab fa-twitter"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fab fa-github"></i>
                        </button>
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

export default Signup;
