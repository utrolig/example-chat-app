import styled from "styled-components";

const GridLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "friendslist messagelist"
    "friendslist composer";
`;

export default GridLayout;
