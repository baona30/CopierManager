const departmentController = require("../controllers/DepartmentController");
const employeeController = require("../controllers/EmployeeController");
const customerController = require("../controllers/CustomerController");
const machineController = require("../controllers/MachineController");
const express = require("express");
const router = express.Router();

// ---------------DEPARTMENT------------------- //
// get all departments
router.get("/department/display", departmentController.getDepartmentList);

// create new department
router.get("/department/create", departmentController.createNewDepartment);

// check login account
router.get(
  "/department/account/:email/:password",
  departmentController.getExistAccount
);

// ---------------EMPLOYEE------------------- //
// get all employees
router.get("/employee/display", employeeController.getEmployeeList);

// create new employee
router.post("/employee/create", employeeController.createNewEmployee);

// get ID for searching employees
router.get(
  "/employee/searchRecord/:fname",
  employeeController.getEmployeeByName
);

// get employee by ID for supporting update
router.get("/employee/:id", employeeController.getEmployeeByID);

// update employee
router.put("/employee/:id", employeeController.updateEmployee);

// delete employee
router.delete("/employee/:id", employeeController.deleteEmployee);

// ---------------MACHINE------------------- //
// get all machine
router.get("/machine/display", machineController.getMachineList);

// create new machine
router.post("/machine/create", machineController.createNewMachine);

// get machine by ID for supporting update
router.get("/machine/:id", machineController.getMachineByID);

// delete machine
router.delete("/machine/:id", machineController.deleteMachine);

// update machine
router.put("/machine/:id", machineController.updateMachine);

// ---------------CUSTOMER------------------- //
// get all customer
router.get("/customer/display", customerController.getCustomerList);

// create new customer
router.post("/customer/create", customerController.createNewCustomer);

// get ID for searching customers name
router.get(
  "/customer/searchRecord/:data",
  customerController.getCustomerByName
);

// get ID for searching customers state
router.get(
  "/customer/searchRecord/:data",
  customerController.getCustomerByState
);

// get customer by ID for supporting update
router.get("/customer/:id", customerController.getCustomerByID);

// update customer
router.put("/customer/:id", customerController.updateCustomer);

// delete customer
router.delete("/customer/:id", customerController.deleteCustomer);

module.exports = router;
