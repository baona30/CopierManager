import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { FaSearchengin, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiUserVoice } from "react-icons/bi";

const EmployeeDetails = () => {
  const [data, setData] = useState([]);
  const [datashow, setDatashow] = useState([])

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "", //working for which department
  });

  //  Object Destructuring
  const { fname, lname, email, password, role } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const fetchDatas = async () => {
    try {
      const res = await Axios.get(
        "http://localhost:3001/api/v1/employee/display"
      );
      if (res.status === 200) {
        setData(res.data);
        setDatashow(res.data)
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Insert Employee Records
  const submitEmployeeRecord = async (e) => {
    // prevent refresh
    e.preventDefault();
    try {
      e.target.reset();
      const res = await Axios.post(
        "http://localhost:3001/api/v1/employee/create",
        user
      );
      if (res.status === 200) {
        alert("Data Inserted");
        setUser({
          fname: "",
          lname: "",
          email: "",
          password: "",
          role: "",
        });
      }
      fetchDatas();

    } catch (err) {
      console.log(err);
    }
  };

  // Search Records here
  const keys = ["employeeFname", "employeeLname", "employeeEmail", "employeePassword", "employeeRole"]
  const searchRecords = (e) => {
    if (e === ""){
      setDatashow(data)
    } else {
      setDatashow(data.filter(
          (item) => keys.some(key => item[key].toLowerCase().includes(e.target.value.toLowerCase()))
        )
      )
    }
};
  
  // Delete Employee Record
  const deleteRecord = async (index) => {
    const id = data[index].employeeID;
    try {
      const res = await Axios.delete(
        `http://localhost:3001/api/v1/employee/${id}`
      );
      console.log("go in side: " + id);
      if (res.status === 200) {
        fetchDatas();
      } else {
        alert("Error in the Code");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div class="container">
        <h4 className="mb-3 text-center mt-4">Information of Employees</h4>
        <div class="row mt-3">
          <div class="col-sm-4">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              {/* Insert data*/}
              <form onSubmit={submitEmployeeRecord}>
                <h5 className="mb-3 ">Insert Employee Records</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="fname"
                    value={fname}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter First name"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="lname"
                    value={lname}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Last name"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Email"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Password"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-2"
                    name="role"
                    value={role}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Department"
                    required="required"
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-block mt-4">
                  Insert Record
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-8">
            <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>
            <div class="input-group mb-4 mt-3">
              <div class="form-outline mt-1">
                <input
                  type="text"
                  class="form-control"
                  id="form1"
                  placeholder="Search Employee Name"
                  onChange={(e) => searchRecords(e.target.value)}
                  style={{ backgroundColor: "#ececec" }}
                />
              </div>
              {/* button search */}
            </div>
            <table class="table table-hover table-striped table-bordered ml-4">
              <thead>
                <tr>
                  <th>FirstName</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {datashow.map((item, index) => (
                  <tr>
                    <td>{item.employeeFName}</td>
                    <td>{item.employeeLName}</td>
                    <td>{item.employeeEmail}</td>
                    <td>{item.employeePassword}</td>
                    <td>{item.employeeRole}</td>
                    <td>
                      {/* button delete*/}
                      <span
                        style={{ cursor: "pointer" }}
                        className="mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete " + item.employeeFName
                          );
                          if (confirmBox === true) {
                            deleteRecord(index);
                          }
                        }}
                      >
                        <i
                          class="text-danger"
                          style={{ fontSize: "18px", marginRight: "10px" }}
                        >
                          <RiDeleteBin6Line />
                        </i>
                      </span>
                      {/* button edit*/}
                      <NavLink
                        className="mr-2"
                        to={`/employee/editID/${data[index].employeeID}`}
                      >
                        <i
                          class="text-warning"
                          aria-hidden="true"
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        >
                          <FaEdit />
                        </i>
                      </NavLink>
                      {/* button watch detail*/}
                      <NavLink
                        className="mr-2"
                        to={`/employee/editID/${data[index].employeeID}`}
                      >
                        <i
                          class="text-info"
                          aria-hidden="true"
                          style={{ fontSize: "21px" }}
                        >
                          <BiUserVoice />
                        </i>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;
