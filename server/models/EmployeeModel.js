//console.log("model_OUTSIDE");
const pool = require("../config/db");

class Employee {
  constructor(employee) {
    this.id = employee.id;
    this.fname = employee.fname;
    this.lname = employee.lname;
    this.email = employee.email;
    this.password = employee.password;
    this.role = employee.role; // for department
  }
}

// get all employees
Employee.getAllEmployees = (result) => {
  pool.query("SELECT employeeID,employeeFName,employeeLName,employeeEmail,employeePassword,employeeRole FROM Employees", (err, res) => {
    if (err) {
      console.log("Error while fetching employess", err);
      result(null, err);
    } else {
      console.log("Employees fetched successfully");
      result(null, res);
    }
  });
};

// create new employee
Employee.createEmployee = async (employeeReqData, result) => {
  //console.log("model_INSIDE");
  const fname = employeeReqData.fname;
  const lname = employeeReqData.lname;
  const email = employeeReqData.email;
  const password = employeeReqData.password;
  const role = employeeReqData.role;

  // console.log("datatata: " + employeeReqData.fname);
  const qry = `INSERT INTO Employees (employeeFName,employeeLName,employeeEmail,employeePassword,employeeRole) VALUES (?,?,?,?,?)`;
  const values = [fname, lname, email, password, role];
  pool.query(qry, values, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Employee created successfully");
      result(null, res);
    }
  });
};

// get employee by Name for Search Data by name
Employee.getEmployeeByName = (first_name, result) => {
  const qry = `SELECT employeeID,employeeFName,employeeLName,employeeEmail,employeePassword,employeeRole FROM Employees WHERE employeeFName = ?`;
  const value = first_name;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while fetching employee by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// get employee by ID for update
Employee.getEmployeeByID = (id, result) => {
  const qry = "SELECT employeeID,employeeFName,employeeLName,employeeEmail,employeePassword,employeeRole FROM Employees WHERE employeeID = ?";
  const value = id;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while fetching employee by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// update employee
Employee.updateEmployee = (id, employeeReqData, result) => {
  const id_update = id;
  const fname = employeeReqData.fname;
  const lname = employeeReqData.lname;
  const email = employeeReqData.email;
  const password = employeeReqData.password;
  const role = employeeReqData.role;

  const qry =
    "UPDATE Employees SET employeeFName=?,employeeLName=?,employeeEmail=?,employeePassword=?,employeeRole=? WHERE employeeID = ?";
  const values = [fname, lname, email, password, role, id_update];
  pool.query(qry, values, (err, res) => {
    if (err) {
      console.log("Error while updating the employee");
      result(null, err);
    } else {
      console.log("Employee updated successfully");
      result(null, res);
    }
  });
};

// delete employee
Employee.deleteEmployee = (id, result) => {
  const qry = "DELETE FROM Employees WHERE employeeID = ?";
  const value = id;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while deleting the employee");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Employee;
