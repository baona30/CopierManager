import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
  });

  const { fname, lname, email, password, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateEmployee = async (e) => {
    e.preventDefault();
    await Axios.put(`http://localhost:3001/api/v1/employee/${id}`, user);
    history("/employee");
  };

  const loadUser = async () => {
    console.log("Edit inside");
    try {
      const res = await Axios.get(
        `http://localhost:3001/api/v1/employee/${id}`
      );
      if (res.status === 200) {
        setUser({
          fname: res.data.response[0].employeeFName,
          lname: res.data.response[0].employeeLName,
          email: res.data.response[0].employeeEmail,
          password: res.data.response[0].employeePassword,
          role: res.data.response[0].employeeRole,
        });
        //console.log(res.data.response[0].employeeFName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Edit A employee</h4>

          <h5 className="text-success">Employee ID : {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="fname"
              value={fname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lname"
              value={lname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Department"
              name="role"
              value={role}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button
            onClick={updateEmployee}
            className="btn btn-secondary btn-block"
          >
            Update Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
