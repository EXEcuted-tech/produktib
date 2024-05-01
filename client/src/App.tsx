import React from 'react';
import './App.css';
import { useState } from "react";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import Sidebar from './components/sidebar/Sidebar'
import Add from './components/modal/Add'

//We will use this ra since usa ra ato page hehe

function App() {
  
    const[darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = ( ) => {
        setDarkMode(!darkMode);
    }

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="animate-fade-in font-montserrat flex">
        <div className='w-[14%]'>
          <Sidebar/>
        </div>

        {/* For the modals */}
        <div className='fixed w-[100%]'>
          <button className='float-right w-12 h-12 b-12 r-12 mt-[1%] ml-auto mr-[3%] rounded-full' onClick={toggleDarkMode}> 
            {darkMode? <FaRegMoon className='ml-auto mr-auto w-8 h-8 b-8 r-8'/> : <FaMoon className='ml-auto mr-auto w-8 h-8 b-8 r-8'/>}
          </button>
          {/* <Add/> */}
        </div>
      </div>
    </div>
    
  );
}

export default App;
