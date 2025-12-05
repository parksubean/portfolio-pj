import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

    
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family:  'NanumSquare', sans-serif;
    background-color: #fff;
    color: #222;
    line-height: 1.5;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  table{
      border-collapse: collapse;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }
  input[type="text"],textarea:focus {
    outline: none;
  }

  textarea{
    resize:none
  }
`;

export default GlobalStyle;
