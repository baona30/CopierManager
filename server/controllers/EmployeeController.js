//console.log("controller_OUTSIDE");
const EmployeeModel = require("../models/EmployeeModel");

//get all employee list
exports.getEmployeeList = (req, res) => {
  EmployeeModel.getAllEmployees((err, employees) => {
    if (err) throw err;
    res.send(employees);
  });
};

// create new employee
exports.createNewEmployee = (req, res) => {
  //console.log("controller_INSIDE");
  const employeeReqData = new EmployeeModel(req.body);
  console.log("employeeReqData", employeeReqData);
  //console.log("controller_INSIDE__");

  // check null
  if (!req.body.fname || !req.body.lname || !req.body.email ||!req.body.password ||!req.body.role)
    {
      res.send(400).send({ success: false, message: "Please fill all fields" });
    } 
  else 
    {
    EmployeeModel.createEmployee(employeeReqData, (err, employee) => 
      {
        if (err) res.send(err);
        console.log("Employee Created Successfully");
        res.json({ status: true, message: "Employee created Successfully" });
//      res.json({
//        status: true,
//        message: "Employee Created Successfully",
//        data: employee.insertId,
//      });
      });
    }
};

// get employee by Name for search by Name
exports.getEmployeeByName = (req, res) => {
  //console.log("get emp by id" + req.params.fname);
  EmployeeModel.getEmployeeByName(req.params.fname, (err, employee) => {
    if (err) res.send(err);
    console.log("single employee data", employee);
    res.send(employee);
  });
};

// get employee by ID  for Update
exports.getEmployeeByID = (req, res) => {
  //console.log("get emp by id: 123 " + req.params.id);
  EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) res.send(err);
    console.log("single employee data", employee);
    res.send(JSON.stringify({ status: 200, error: null, response: employee }));
  });
};

// update employee
exports.updateEmployee = (req, res) => {
  const employeeReqData = new EmployeeModel(req.body);
  console.log("employeeReqData update", employeeReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    EmployeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Employee updated Successfully" });
      }
    );
  }
};

// delete employee
exports.deleteEmployee = (req, res) => {
  console.log("get id: " + req.params.id);
  EmployeeModel.deleteEmployee(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Employee deleted successully!" });
  });
};
