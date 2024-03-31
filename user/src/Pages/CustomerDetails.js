import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { FaSearchengin, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./index.scss";

const CustomerDetails = () => {
  const [data, setData] = useState([]);
  const [datashow, setDatashow] = useState([])
  const [user, setUser] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const fetchDatas = async () => {
    try {
      const res = await Axios.get(
        "http://localhost:3001/api/v1/customer/display"
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

  // Insert Customer Records
  const submitCustomerRecord = async (e) => {
    // prevent refresh
    e.preventDefault();
    try {
      e.target.reset();
      const res = await Axios.post(
        "http://localhost:3001/api/v1/customer/create",
        user
      );
      if (res.status === 200) {
        alert("Data Inserted");
        setUser({
          name: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
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
    const keys = ["Customer_name","Address","City","State","Zip_code"]
    const searchAll = (e) => {
      if (e.target.value === ""){
        setDatashow(data)
      } else {
        setDatashow(data.filter(
            (item) => keys.some(key => item[key].toLowerCase().includes(e.target.value.toLowerCase()))
          )
        )
      }
      setUser({ ...user, [e.target.name]: e.target.value });
  }
   // Delete Customer Record
  const deleteRecord = async (id) => {
//    const id = data[index].Customer_ID;
    try {
      const res = await Axios.delete(
        `http://localhost:3001/api/v1/customer/${id}`
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
        <h4 className="mb-3 text-center mt-4">Information of Customer</h4>
        <div class="row mt-3">
          <div class="col-sm-4">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              {/* Insert data*/}
              <form onSubmit={submitCustomerRecord}>
                <h5 className="mb-3 ">Insert Customer Records</h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="name"
                    value={user.name}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Customer Name"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="address"
                    value={user.address}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Address"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="city"
                    value={user.city}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter City"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="state"
                    value={user.state}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter State"
                    required="required"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-2"
                    name="zipcode"
                    value={user.zipcode}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Zipcode"
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
                  class="form-control"
                  placeholder="Search Customer Here"
                  style={{ backgroundColor: "#ececec" }}
                  onChange={(e) => searchAll(e)}
                />
              </div>
              <FaSearchengin style={{ fontSize: "30px", color: "cyan"}} />
            </div>
            <table class="table table-hover table-striped table-bordered ml-4">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zipcode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {datashow.map((item) => (
                    <tr>
                      <td>{item.Customer_name}</td>
                      <td>{item.Address}</td>
                      <td>{item.City}</td>
                      <td>{item.State}</td>
                      <td>{item.Zip_code}</td>
                      <td>
                        {/* button delete*/}
                        <span
                          style={{ cursor: "pointer" }}
                          className="mr-2"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Do you really want to delete " +
                                item.Customer_name + "-id:" + item.Customer_ID
                            );
                            if (confirmBox === true) {
                              deleteRecord(item.Customer_ID);
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
                          to={`/customer/editID/${item.Customer_ID}`}
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
