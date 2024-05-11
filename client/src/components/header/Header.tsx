import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import useColorMode from "../../hooks/useColorMode"

const Header = () => {
  const [colorMode, setColorMode] = useColorMode();

  const title = localStorage.getItem('cat_title');
  
  useEffect(()=>{
    
  },[title])
  
  return (
    <div className='flex items-center'>
        <div className='w-[93%] dark:bg-black'>
          <h1 className='ml-[3%] py-[0.9%] font-black text-[2em] text-primary dark:text-white'>{title}</h1>
        </div>
        <div className=''>
          <button className='float-right w-12 h-12 b-12 r-12 mt-[1%] ml-auto mr-[3%]' onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}> 
            {colorMode === "dark" ? <MdLightMode className='animate-pop2 ml-auto mr-auto w-8 h-8 b-8 r-8 text-white'/> : <FaMoon className='animate-pop1 ml-auto mr-auto w-8 h-8 b-8 r-8 text-primary'/>}
          </button>
        </div>
    </div>
  )
}

export default Header