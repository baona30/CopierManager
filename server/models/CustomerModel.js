//console.log("model_OUTSIDE");
const pool = require("../config/db");

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.address = customer.address;
    this.city = customer.city;
    this.state = customer.state;
    this.zipcode = customer.zipcode;
  }
}

// get all customers
Customer.getAllCustomers = (result) => {
  pool.query("SELECT Customer_ID,Customer_name,Address,City,State,Zip_code FROM Customers", (err, res) => {
    if (err) {
      console.log("Error while fetching customers", err);
      result(null, err);
    } else {
      console.log("Customers fetched successfully");
      result(null, res);
    }
  });
};

// check exist State column
Customer.IsExistState = async (customerReqData, result) => {
  const state = customerReqData.state;
  const value = state;

  const qry = `SELECT State FROM States WHERE State = ?`;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while finding data");
      result(null, err);
    } else {
      if (res == null || res.length == 0) {
        console.log("Not Exist Column State");
        result(null, "");
      } else {
        console.log("Column State is exist");
        result(null, res);
      }
    }
  });
};

// create new customer
Customer.createCustomer = async (customerReqData, result) => {
  const name = customerReqData.name;
  const address = customerReqData.address;
  const city = customerReqData.city;
  const state = customerReqData.state;
  const zipcode = customerReqData.zipcode;

  const qry = `INSERT INTO Customers (Customer_name,Address,City,State,Zip_code) VALUES (?,?,?,?,?)`;
  const values = [name, address, city, state, zipcode];
  pool.query(qry, values, (err, res) => {
    if (err) {
      //throw err;
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Customer created successfully");
      result(null, res);
    }
  });
};

// get employee by Name for Search Data by name
Customer.getCustomerByName = (data, result) => {
  const qry = `SELECT Customer_name,Address,City,State,Zip_code FROM Customers WHERE Customer_name = ?`;
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
Customer.getCustomerByState = (data, result) => {
  const qry = `SELECT Customer_name,Address,City,State,Zip_code FROM Customers WHERE State = ?`;
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
Customer.getCustomerByID = (id, result) => {
  const qry = "SELECT Customer_name,Address,City,State,Zip_code FROM Customers WHERE Customer_ID = ?";
  const value = id;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while fetching customer by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// update employee
Customer.updateCustomer = (id, customerReqData, result) => {
  const id_update = id;
  const name = customerReqData.name;
  const address = customerReqData.address;
  const city = customerReqData.city;
  const state = customerReqData.state;
  const zipcode = customerReqData.zipcode;

  const qry =
    "UPDATE Customers As c INNER JOIN States As s ON c.State = s.State SET c.Customer_name=?,c.Address=?,c.City=?,c.State=?,c.Zip_code=? WHERE c.Customer_ID = ?";
  const values = [name, address, city, state, zipcode, id_update];
  pool.query(qry, values, (err, res) => {
    if (err) {
      console.log("Error while updating the customer");
      result(null, err);
    } else {
      console.log("Customer updated successfully");
      result(null, res);
    }
  });
};

// delete employee
Customer.deleteCustomer = (id, result) => {
  const qry = "DELETE FROM Customers WHERE Customer_ID = ?";
  const value = id;
  pool.query(qry, value, (err, res) => {
    if (err) {
      console.log("Error while deleting the customer");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Customer;
