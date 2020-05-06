import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
      background-color: rgb(54,57,63);
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Manrope', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .25); 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, .45); 
  }
`;

export default GlobalStyle;
