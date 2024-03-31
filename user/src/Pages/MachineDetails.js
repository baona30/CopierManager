import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { FaSearchengin, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./index.scss";

const CustomerDetails = () => {
  const [data, setData] = useState([]);
  const [searchOption, setSearchOption] = useState("");
  const [search, setSearch] = useState(""); //not use
  const [serachFilter, setSearchFilter] = useState("");
  const [user, setUser] = useState({
    serialno: "",
    customer_id: "",
    employee_id: "",
    model_id: "",
    model_name: "",
    brand_name: "",
    model_type: "",
  });

  //  Object Destructuring
  const {
    serialno,
    customer_id,
    employee_id,
    model_id,
    model_name,
    brand_name,
    model_type,
  } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const fetchDatas = async () => {
    try {
      const res = await Axios.get(
        "http://localhost:3001/api/v1/machine/display"
      );
      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Insert Customer Records
  const submitCustomerRecord = async (e) => {
    // prevent refresh
    e.preventDefault();
    try {
      e.target.reset();
      const res = await Axios.post(
        "http://localhost:3001/api/v1/machine/create",
        user
      );
      if (res.status === 200) {
        alert("Data Inserted");
        setUser({
          serialno: "",
          customer_id: "",
          employee_id: "",
          model_id: "",
          model_name: "",
          brand_name: "",
          model_type: "",
        });
      } else {
        console.log(res.message);
      }
      fetchDatas();
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

  // Search Records here <- not use now
  const searchRecords = async () => {
    //alert(search);
    try {
      if (search !== "") {
        const res = await Axios.get(
          searchOption === "state"
            ? `http://localhost:3001/api/v1/customer/searchRecord/${searchOption}`
            : `http://localhost:3001/api/v1/customer/searchRecord/${search}`
        );
        if (res.status === 200) {
          setData(res.data);
        }
      } else {
        fetchDatas();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Employee Record
  const deleteRecord = async (index) => {
    const id = data[index].Serial_no;
    try {
      const res = await Axios.delete(
        `http://localhost:3001/api/v1/machine/${id}`
      );
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
        <h4 className="mb-3 text-center mt-4">Information of Machine</h4>
        <div class="row mt-3">
          <div class="col-sm-4">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              {/* Insert data*/}
              <form onSubmit={submitCustomerRecord}>
                <h5 className="mb-3 ">Insert Machine Records</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="serialno"
                    value={serialno}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Serial No"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="customer_id"
                    value={customer_id}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Customer ID"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="employee_id"
                    value={employee_id}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Employee ID"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="model_id"
                    value={model_id}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Model ID"
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
                  id="form1"
                  onChange={(e) => setSearchFilter(e.target.value)}
                  class="form-control"
                  placeholder="Search Customer Here"
                  style={{ backgroundColor: "#ececec" }}
                />
              </div>
              {/*toggle choose opt for searching */}
              <div class="normal-container">
                <div class="smile-rating-container">
                  <div class="smile-rating-toggle-container">
                    <form class="submit-rating">
                      <input
                        id="meh"
                        name="satisfaction"
                        value="serial"
                        type="radio"
                        onChange={(e) => {
                          setSearchOption(e.target.value);
                        }}
                      />
                      <input
                        id="fun"
                        name="satisfaction"
                        value="model"
                        type="radio"
                        onChange={(e) => {
                          setSearchOption(e.target.value);
                        }}
                      />
                      <label for="meh" class="rating-label rating-label-meh">
                        Serial
                      </label>
                      <div class="smile-rating-toggle"></div>

                      <div class="rating-eye rating-eye-left"></div>
                      <div class="rating-eye rating-eye-right"></div>

                      <div class="mouth rating-eye-bad-mouth"></div>

                      <div class="toggle-rating-pill"></div>
                      <label for="fun" class="rating-label rating-label-fun">
                        Model
                      </label>
                    </form>
                  </div>
                </div>
              </div>
              {/* button search */}
              <button
                type="button"
                onClick={searchRecords}
                class="btn"
                style={{
                  padding: "5px 10px",
                  fontSize: "20px",
                  marginTop: "4px",
                  backgroundColor: "#555e63",
                }}
              >
                <FaSearchengin style={{ color: "#f5deb3" }} />
              </button>
            </div>
            <table class="table table-hover table-striped table-bordered ml-4">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Customer Name</th>
                  <th>Employee Name</th>
                  <th>Model ID</th>
                  <th>Model Name</th>
                  <th>Model Brand</th>
                  <th>Model Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => {
                    return serachFilter.toLowerCase() === ""
                      ? item
                      : searchOption === "serial"
                      ? item.Serial_no.toLowerCase().includes(
                          serachFilter.toLowerCase()
                        )
                      : item.Model_name.toLowerCase().includes(
                          serachFilter.toLowerCase()
                        );
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.Serial_no}</td>
                      <td>{item.Customer_name}</td>
                      <td>{item.Employee_name}</td>
                      <td>{item.Model_ID}</td>
                      <td>{item.Model_name}</td>
                      <td>{item.Brand_name}</td>
                      <td>{item.Model_type}</td>
                      <td>
                        {/* button delete*/}
                        <span
                          style={{ cursor: "pointer" }}
                          className="mr-2"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Do you really want to delete " + item.Serial_no
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
                          to={`/machine/editID/${data[index].Serial_no}`}
                        >
                          <i
                            class="text-warning"
                            aria-hidden="true"
                            style={{ fontSize: "20px", marginRight: "10px" }}
                          >
                            <FaEdit />
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

export default CustomerDetails;
