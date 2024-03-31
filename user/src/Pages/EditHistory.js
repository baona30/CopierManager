import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditHistory = () => {
  const history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams(); //The useParams() hook helps us to access the URL parameters from a current route.
  const [user, setUser] = useState({
    history_ID: "",
    serial_no: "",
    problem: "",
    solving: "",
  });

  const { 
    history_ID,
    serial_no,
    problem,
    solving,
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateHistory = async (e) => {
    e.preventDefault();
    const res = await Axios.put(
      `http://localhost:3001/api/v1/history/${id}`,
      user
    );
    if (res.status === 200) {
      // fix moree!!!! here
      console.log("success update!!!");
    } else {
      console.log("fail update!!!");
    }
    history("/history");
  };

  const loadUser = async () => {
    //console.log("Edit inside");
    try {
      const res = await Axios.get(
        `http://localhost:3001/api/v1/history/${id}`
      );
      if (res.status === 200) {
        setUser({
          history_ID: res.data.response[0].history_ID,
          serial_no: res.data.response[0].serial_no,
          problem: res.data.response[0].problem,
          solving: res.data.response[0].solving,
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
          <h4 className="text-center mb-4">Edit A Machine Problem</h4>

          <h5 className="text-success">History ID : {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter History ID"
              name="name"
              value={history_ID}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Address"
              name="Serial_no"
              value={serial_no}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter City"
              name="Problem"
              value={problem}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter State"
              name="Solving"
              value={solving}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button
            onClick={updateHistory}
            className="btn btn-secondary btn-block"
          >
            Update Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHistory;
