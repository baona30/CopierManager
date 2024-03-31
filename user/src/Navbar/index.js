import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Icons,
} from "./NavbarElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirefox } from "@fortawesome/free-brands-svg-icons";
import CustomButton from "../components/customButton";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Icons>
          <FontAwesomeIcon icon={faFirefox} />
        </Icons>
        <Bars />
        <NavMenu>
          <NavLink to="/employee" activeStyle>
            Employees
          </NavLink>
          <NavLink to="/customer" activeStyle>
            Customers
          </NavLink>
          <NavLink to="/machine" activeStyle>
            Machines
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/account">
            <CustomButton />
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
