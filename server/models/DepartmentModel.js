//console.log("model_OUTSIDE");
const pool = require("../config/db");

class Department {
  constructor(department) {
    this.name = department.departmentName;
    this.no = department.departmentNo;
    this.email = department.email;
    this.password = department.password;
  }
}

// get all departments
Department.getAllDepartments = (result) => {
  pool.query("SELECT * FROM Departments", (err, res) => {
    if (err) {
      console.log("Error while fetching departments", err);
      result(null, err);
    } else {
      console.log("Departments fetched successfully");
      result(null, res);
    }
  });
};

// create new department
Department.createDepartment = async (departmentReqData, result) => {
  const name = departmentReqData.name;
  const no = departmentReqData.no;
  const email = departmentReqData.email;
  const password = departmentReqData.password;

  const qry = `INSERT INTO Departments (nameDepart,noDepart,email,password) VALUES (?,?,?,?)`;
  const values = [name, no, email, password];
  pool.query(qry, values, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Department created successfully");
      result(null, res);
    }
  });
};

//get exist account
Department.getAccount = async (departmentReqData, result) => {
  const email = departmentReqData.email;
  const password = departmentReqData.password;

  const qry = `SELECT * FROM Departments WHERE email = ? AND password = ?`;
  const values = [email, password];
  pool.query(qry, values, (err, res) => {
    if (err) {
      console.log("Error while finding data");
      result(null, err);
    } else {
      console.log("Account is exist");
      result(null, res);
    }
  });
};

module.exports = Department;
