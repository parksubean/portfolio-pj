import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import styled from 'styled-components';
import { Intro } from './sections'; 

function App() {
  const [count, setCount] = useState(0)
  // const Container = styled.div`
    
  // `;

  
  return (
    <>
      <Intro/>
    </>
  )
}

export default App
