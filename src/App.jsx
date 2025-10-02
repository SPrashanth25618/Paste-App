import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Allpastes from './components/Allpastes'
import ViewPaste from './components/ViewPaste'  
import Home from './components/Home'

const router = createBrowserRouter(
  [
     {
        path: "/",
        element: 
        <div>
          <Navbar />
          <Home />
        </div>
     },
     {
        path: "/pastes",
        element:
        <div>
          < Navbar />
          < Allpastes />
        </div>
     },
     {
        path: "/pastes/:id",
        element:
        <div>
          < Navbar />
          <ViewPaste />
        </div>
     },
  ]
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
