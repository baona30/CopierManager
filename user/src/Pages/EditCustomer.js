import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.
  const [user, setUser] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const { name, address, city, state, zipcode } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateCustomer = async (e) => {
    e.preventDefault();
    const res = await Axios.put(
      `http://localhost:3001/api/v1/customer/${id}`,
      user
    );
    if (res.status === 200) {
      // fix moree!!!! here
      console.log("success update!!!");
    } else {
      console.log("fail update!!!");
    }
    history("/customer");
  };

  const loadUser = async () => {
    //console.log("Edit inside");
    try {
      const res = await Axios.get(
        `http://localhost:3001/api/v1/customer/${id}`
      );
      if (res.status === 200) {
        setUser({
          name: res.data.response[0].Customer_name,
          address: res.data.response[0].Address,
          city: res.data.response[0].City,
          state: res.data.response[0].State,
          zipcode: res.data.response[0].Zip_code,
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
          <h4 className="text-center mb-4">Edit A customer</h4>

          <h5 className="text-success">Customer ID : {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Address"
              name="address"
              value={address}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter City"
              name="city"
              value={city}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter State"
              name="state"
              value={state}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Zipcode"
              name="zipcode"
              value={zipcode}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button
            onClick={updateCustomer}
            className="btn btn-secondary btn-block"
          >
            Update Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
