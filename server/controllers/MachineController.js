const MachineModel = require("../models/MachineModel");

//get all machine list
exports.getMachineList = (req, res) => {
  MachineModel.getAllMachines((err, machine) => {
    if (err) throw err;
    res.send(machine);
  });
};

// create new machine
exports.createNewMachine = (req, res) => {
  const machineReqData = new MachineModel(req.body);

  // check null
  if (
    !req.body.serialno ||
    !req.body.customer_id ||
    !req.body.employee_id ||
    !req.body.model_id //||
    //!req.body.model_name ||
    //!req.body.brand_name ||
    //!req.body.model_type
  ) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    // check exist customerID first
    MachineModel.IsExistCustomer(machineReqData, (err, customerIDData) => {
      if (err) {
        res.send(err);
      }
      if (customerIDData.length == 0) {
        //res.json({ status: true, message: "not found" });
        res.status(404).json({
          errors: [
            {
              msg: "No record in Customer",
            },
          ],
        });
      } else {
        // check exist employeeID
        MachineModel.IsExistEmployee(machineReqData, (err, employeeIDData) => {
          if (err) {
            res.send(err);
          }
          if (employeeIDData.length == 0) {
            //res.json({ status: true, message: "not found" });
            res.status(404).json({
              errors: [
                {
                  msg: "No record in Employee",
                },
              ],
            });
          } else {
            // chekc exist modelID
            MachineModel.IsExistModelID(machineReqData, (err, modelID) => {
              if (err) {
                res.send(err);
              }
              // it will be insert if they were successful
              MachineModel.createMachine(machineReqData, (err, machine) => {
                if (err) res.send(err);
                res.json({
                  status: true,
                  message: "Machine Created Successfully",
                  data: machine.insertId,
                });
              });
            });
          }
        });
      }
    });
  }
};

// get employee by ID  for Update
exports.getMachineByID = (req, res) => {
  //console.log("get emp by id: 123 " + req.params.id);
  MachineModel.getMachineByID(req.params.id, (err, machine) => {
    if (err) res.send(err);
    console.log("single machine data", machine);
    res.send(JSON.stringify({ status: 200, error: null, response: machine }));
  });
};

// update machine
exports.updateMachine = (req, res) => {
  const machineReqData = new MachineModel(req.body);
  console.log("machineReqData update", machineReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    MachineModel.updateMachine(
      req.params.id,
      machineReqData,
      (err, machine) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Machine updated Successfully" });
      }
    );
  }
};

// delete machine
exports.deleteMachine = (req, res) => {
  //console.log("get id: " + req.params.id);
  MachineModel.deleteMachine(req.params.id, (err, machine) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Machine deleted successully!" });
  });
};
