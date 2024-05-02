import React from 'react'
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  return (
    <div className='flex items-center'>
        <div className='w-[93%]'>
          <h1 className='ml-[3%] py-[0.9%] font-black text-[2em] text-primary'>Academics</h1>
        </div>
        <div className=''>
          <MdDarkMode className='text-[2em] hover:cursor-pointer text-primary'/>
        </div>
    </div>
  )
}

export default Header