import { Button } from "@mui/material";
import styled from "styled-components";

export const CustomButton = styled(Button)`
  color: white;
  background-color: ${(props) =>
    props.background === "delete" ? "#d83c3c" : "#0d93b3"};
  m: 2;
  display: flex;
  border: 0px;
  borderradius: 10px;
  padding: 6px 30px;
  texttransform: capitalize;
  fontsize: 15px;
  &:hover {
    background-color: ${(props) =>
      props.background === "delete" ? "#c10202" : "#07809c"};
  }
`;

