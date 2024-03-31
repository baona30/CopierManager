import React, { useState } from "react";
import Login from "./LoginForm";
import { AccountContext } from "./AccountContext";
import {
  BackDrop,
  backdropVariants,
  expandingTransition,
} from "./AccountBoxElements";
import Signup from "./SignupForm";

const AccountBox = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 500);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 500);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      {/*BoxContainer*/}
      <div>
        {active === "signin" && <Login />}
        {active === "signup" && <Signup />}
      </div>
      {/*InnerContainer*/}
    </AccountContext.Provider>
  );
};

/*InnerContainer*/
// <div>
//         <BackDrop
//           initial={false}
//           animate={isExpanded ? "expanded" : "collapsed"}
//           variants={backdropVariants}
//           transition={expandingTransition}
//         />
//       </div>
export default AccountBox;
