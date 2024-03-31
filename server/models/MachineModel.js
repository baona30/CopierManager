const pool = require("../config/db");

class Machine {
  constructor(machine) {
    this.serial = machine.serialno;
    this.customerID = machine.customer_id;
    this.employeeID = machine.employee_id;
    this.modelID = machine.model_id;
    this.modelName = machine.model_name;
    this.brandName = machine.brand_name;
    this.modelType = machine.model_type;
  }
}

// get all customers
Machine.getAllMachines = (result) => {
  const qry =
    "SELECT m.Serial_no,c.Customer_ID,c.Customer_name,e.employeeID,Concat(e.employeeFName,' ',e.employeeLName) AS Employee_name,mo.Model_ID,mo.Model_name,mo.Brand_name,mo.Model_type FROM Machines AS m JOIN Customers AS c ON c.Customer_ID = m.Customer_ID JOIN Employees AS e ON e.employeeID = m.employeeID JOIN Models As mo ON mo.Model_ID = m.Model_ID";

  pool.query(qry, (err, res) => {
    if (err) {
      console.log("Error while fetching machine", err);
      result(null, err);
    } else {
      console.log("Machines fetched successfully");
      result(null, res);
    }
  });
};

// check exist Customer column
Machine.IsExistCustomer = async (machineReqData, result) => {
  const customerid = machineReqData.customerID;
  const value = customerid;

  const qry = `SELECT Customer_ID FROM Customers WHERE Customer_ID = ?`;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while finding data");
      result(null, err);
    } else {
      if (res == null || res.length == 0) {
        console.log("Not Exist Column CustomerID");
        result(null, "");
      } else {
        console.log("Column CustomerID is exist");
        result(null, res);
      }
    }
  });
};

// check exist Employee column
Machine.IsExistEmployee = async (machineReqData, result) => {
  const employeeid = machineReqData.employeeID;
  const value = employeeid;

  const qry = `SELECT employeeID FROM Employees WHERE employeeID = ?`;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while finding data");
      result(null, err);
    } else {
      if (res == null || res.length == 0) {
        console.log("Not Exist Column employeeID");
        result(null, "");
      } else {
        console.log("Column employeeID is exist");
        result(null, res);
      }
    }
  });
};

// check exist Model column
Machine.IsExistModelID = async (machineReqData, result) => {
  const modelid = machineReqData.modelID;
  const value = modelid;

  const qry = `SELECT Model_ID FROM Models WHERE Model_ID = ?`;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while finding data");
      result(null, err);
    } else {
      if (res == null || res.length == 0) {
        console.log("Not Exist Column Model_ID");
        result(null, "");
      } else {
        console.log("Column Model_ID is exist");
        result(null, res);
      }
    }
  });
};

// create new machine
Machine.createMachine = async (machineReqData, result) => {
  const serialNo = machineReqData.serial;
  const customerID = machineReqData.customerID;
  const employeeID = machineReqData.employeeID;
  const modelID = machineReqData.modelID;

  const qry = `INSERT INTO Machines (Serial_no,Customer_ID,employeeID,Model_ID) VALUES (?,?,?,?)`;
  const values = [serialNo, customerID, employeeID, modelID];
  pool.query(qry, values, (err, res) => {
    if (err) {
      throw err;
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Machine created successfully");
      result(null, res);
    }
  });
};

// get employee by Name for Search Data by name
Machine.getCustomerByName = (data, result) => {
  const qry = `SELECT * FROM Customers WHERE Customer_name = ?`;
  const value = data;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while fetching customer by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// get employee by State for Search Data by state
Machine.getCustomerByState = (data, result) => {
  const qry = `SELECT * FROM Customers WHERE State = ?`;
  const value = data;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while fetching customer by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
// get employee by ID for update
Machine.getMachineByID = (id, result) => {
  const qry = "SELECT * FROM Machines WHERE Serial_no = ?";
  const value = id;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while fetching machine by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// update machine
Machine.updateMachine = (id, machineReqData, result) => {
  const serialNo = id;
  const customerID = machineReqData.customerID;
  const employeeID = machineReqData.employeeID;
  const modelID = machineReqData.modelID;

  const qry =
    "UPDATE Machines As m INNER JOIN Customers As c ON c.Customer_ID = m.Customer_ID INNER JOIN Employees As e ON e.employeeID = m.employeeID INNER JOIN Models As mo ON mo.Model_ID = m.Model_ID SET m.Customer_ID=?,m.employeeID=?,m.Model_ID=? WHERE m.Serial_no=?";
  const values = [customerID, employeeID, modelID, serialNo];
  pool.query(qry, values, (err, res) => {
    if (err) {
      console.log("Error while updating the machine");
      result(null, err);
    } else {
      console.log("Machine updated successfully");
      result(null, res);
    }
  });
};

// delete employee
Machine.deleteMachine = (id, result) => {
  const qry = "DELETE FROM Machines WHERE Serial_no = ?";
  const value = id;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while deleting the machine");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Machine;
