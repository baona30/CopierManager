const DepartmentModel = require("../models/DepartmentModel");

//get all customer list
exports.getDepartmentList = (req, res) => {
  DepartmentModel.getAllDepartments((err, department) => {
    if (err) throw err;
    res.send(department);
  });
};

// create new employee
exports.createNewDepartment = (req, res) => {
  const departmentReqData = new DepartmentModel(req.body);
  console.log("departmentReqData: ", departmentReqData);

  // check null
  if (
    !req.body.departmentName ||
    !req.body.departmentNo ||
    !req.body.email ||
    !req.body.password
  ) {
    res
      .sendStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    DepartmentModel.createDepartment(departmentReqData, (err, department) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Department Created Successfully",
        data: department.insertId,
      });
    });
  }
};

//get exist account for logging
exports.getExistAccount = (req, res) => {
  const departmentReqData = new DepartmentModel(req.params);

  // check null
  if (!req.params.email || !req.params.password) {
    res
      .sendStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    DepartmentModel.getAccount(departmentReqData, (err, department) => {
      if (err) res.send(err);
      if (department.length == 0) {
        console.log("data is null");
        return res.status(404).json({
          erros: [
            {
              msg: "No user found",
            },
          ],
        });
      } else {
        res.json({
          status: true,
          message: "Login Is Successfully",
          data: department,
        });
      }
    });
  }
};
