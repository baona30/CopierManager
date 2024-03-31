import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditMachine = () => {
  const history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.
  const [user, setUser] = useState({
    serialno: "",
    customer_id: "",
    employee_id: "",
    model_id: "",
    model_name: "",
    brand_name: "",
    model_type: "",
  });

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

  useEffect(() => {
    loadUser();
  }, []);

  const updateMachine = async (e) => {
    e.preventDefault();
    const res = await Axios.put(
      `http://localhost:3001/api/v1/machine/${id}`,
      user
    );
    if (res.status === 200) {
      // fix moree!!!! here
      console.log("success update!!!");
    } else {
      console.log("fail update!!!");
    }
    history("/machine");
  };

  const loadUser = async () => {
    try {
      const res = await Axios.get(`http://localhost:3001/api/v1/machine/${id}`);
      if (res.status === 200) {
        setUser({
          serialno: res.data.response[0].Serial_no,
          customer_id: res.data.response[0].Customer_ID,
          employee_id: res.data.response[0].employeeID,
          model_id: res.data.response[0].Model_ID,
          model_name: res.data.response[0].Model_name,
          brand_name: res.data.response[0].Brand_name,
          model_type: res.data.response[0].Model_type,
        });
        console.log("data pass: " + res.data.response[0].Model_name); //<- next feature (real time display name when put data modelID)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Edit A machine</h4>

          <h5 className="text-success">Machine ID : {user.serialno} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Customer ID"
              name="customer_id"
              value={customer_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Employee ID"
              name="employee_id"
              value={employee_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Model ID"
              name="model_id"
              value={model_id}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button
            onClick={updateMachine}
            className="btn btn-secondary btn-block"
          >
            Update Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMachine;
