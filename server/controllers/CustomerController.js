const CustomerModel = require("../models/CustomerModel");

//get all customer list
exports.getCustomerList = (req, res) => {
  CustomerModel.getAllCustomers((err, customers) => {
    if (err) throw err;
    res.send(customers);
  });
};

// create new employee
exports.createNewCustomer = (req, res) => {
  const customerReqData = new CustomerModel(req.body);

  // check null
  if (
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zipcode
  ) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    // check exist state first
    CustomerModel.IsExistState(customerReqData, (err, createData) => {
      if (err) {
        res.send(err);
      }
      if (createData.length == 0) {
        //res.json({ status: true, message: "not found" });
        res.status(404).json({
          errors: [
            {
              msg: "No employee created",
            },
          ],
        });
      } else {
        // it will be insert if they were successful
        CustomerModel.createCustomer(customerReqData, (err, customer) => {
          if (err) res.send(err);
          res.json({
            status: true,
            message: "Customer Created Successfully",
            data: customer.insertId,
          });
        });
      }
    });
  }
};

// get employee by Name for search name
exports.getCustomerByName = (req, res) => {
  console.log("get emp by id " + req.params.data);
  CustomerModel.getCustomerByName(req.params.data, (err, customer) => {
    if (err) res.send(err);
    console.log("single customer data", customer);
    res.send(customer);
  });
};

// get employee by State for search state
exports.getCustomerByState = (req, res) => {
  console.log("get emp by id " + req.params.data);
  CustomerModel.getCustomerByState(req.params.data, (err, customer) => {
    if (err) res.send(err);
    console.log("single customer data", customer);
    res.send(customer);
  });
};

// get employee by ID  for Update
exports.getCustomerByID = (req, res) => {
  //console.log("get emp by id: 123 " + req.params.id);
  CustomerModel.getCustomerByID(req.params.id, (err, customer) => {
    if (err) res.send(err);
    console.log("single customer data", customer);
    res.send(JSON.stringify({ status: 200, error: null, response: customer }));
  });
};

// update employee
exports.updateCustomer = (req, res) => {
  const customerReqData = new CustomerModel(req.body);
  console.log("customerReqData update", customerReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    CustomerModel.updateCustomer(
      req.params.id,
      customerReqData,
      (err, customer) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Customer updated Successfully" });
      }
    );
  }
};

// delete employee
exports.deleteCustomer = (req, res) => {
  //console.log("get id: " + req.params.id);
  CustomerModel.deleteCustomer(req.params.id, (err) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Customer deleted successully!" });
  });
};
