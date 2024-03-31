import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountBox from "./Account/AccountBox";
import EmployeeDetails from "./Pages/EmployeeDetails";
import EditEmployee from "./Pages/EditEmployee";
import MachineDetails from "./Pages/MachineDetails";
import EditMachine from "./Pages/EditMachine";
import CustomerDetails from "./Pages/CustomerDetails";
import EditCustomer from "./Pages/EditCustomer";
import PageNotFound from "./Pages/PageNotFound";
import WelcomePage from "./Pages/WelcomePage";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/employee" element={<EmployeeDetails />} />
        <Route path="/employee/editID/:id" element={<EditEmployee />} />
        <Route path="/customer" element={<CustomerDetails />} />
        <Route path="/customer/editID/:id" element={<EditCustomer />} />
        <Route path="/machine" element={<MachineDetails />} />
        <Route path="/machine/editID/:id" element={<EditMachine />} />
        <Route path="/account" element={<AccountBox />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
