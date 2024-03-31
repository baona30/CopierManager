import employeeControler from "../controllers/EmployeeController";

const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// router.get("/", async (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;

//     try {
//       const qry = `SELECT u.username FROM user as u INNER JOIN tweets as t ON u.id = t.user_id`;
//       conn.query(qry, (err, result) => {
//         conn.release();
//         if (err) throw err;
//         res.send(JSON.stringify(result));
//       });
//     } catch {}
//   });
// });

router.get("/employees", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry = "SELECT * FROM Employees";
    conn.query(qry, (err, result) => {
      conn.release();
      if (err) console.log(err);
      res.send(result);
    });
  });
});

router.post("/addEmployee", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const role = "SE";

  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry = `INSERT INTO Employees(employeeFName,employeeLName,employeeEmail,employeePassword,employeeRole) VALUES(?,?,?,?,?)`;
    const values = [fname, lname, email, password, role];
    conn.query(qry, values, (err, result) => {
      conn.release();
      if (err) console.log(err);
      console.log("Employee added!");
    });
    res.redirect("http://localhost:3000/account");
    res.end();
  });
});

module.exports = router;
