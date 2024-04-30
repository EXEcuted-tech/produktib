import React from 'react'
import logo from "../../assets/logo.png"
import { FaPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
        <div className='bg-[#001A27] h-[8vh] rounded-tr-3xl'>
            <img src={logo} alt="Produktib Logo" className="h-auto w-[15rem] py-[5%] pl-[10%]"></img>
        </div>
        <div className='bg-[#023047] h-[92vh]'>
            <div className='mx-[10%] pt-[7%] flex'>
                <h1 className='font-bold text-[#D3D3D3] text-[1.15em] mr-[7%]'>TASK CATEGORIES</h1>
                <FaPlus className='text-[#D3D3D3] text-[1.15em] mt-[1.5%] hover:cursor-pointer hover:text-white'/>
            </div>
            
            
        </div>        
    </div>
  )
}

export default Sidebar