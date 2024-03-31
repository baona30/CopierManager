import styled from "styled-components";
import { motion } from "framer-motion";

export const BackDrop = styled(motion.div)`
  width: 50%;
  height: 105px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 10%;
  transform: rotate(90deg);
  bottom: 80px;
  right: 450px;
  background: #fbe3e8;
`;

export const backdropVariants = {
  expanded: {
    width: "35%",
    height: "780px",
    borderRadius: "2%",
    transform: "rotate(90deg)",
  },
  collapsed: {
    width: "5%",
    height: "80px",
    borderRadius: "10%",
    transform: "rotate(90deg)",
  },
};

export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 40,
};
