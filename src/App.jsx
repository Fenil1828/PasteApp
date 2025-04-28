import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'


// Layout component to handle conditional overflow
const Layout = ({ children, isHomePage }) => {
  return (
    <div style={{ overflowY: isHomePage ? 'hidden' : 'auto' }}>
      <Navbar />
      {children}
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home />
      </div>
    },

    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },

    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    },

  ]
)

function App() {

  return (
   <div>
    <RouterProvider router={router}/>
   </div>
  )
}

export default App
