import React,{useEffect, useState} from 'react'
import { CgCloseR } from "react-icons/cg";
import { TbTextSize } from "react-icons/tb";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";

/*Ty pwede ra nimo gamiton ang TaskProps sa  interface.ts*/
const View = () => {
  return (
    <div className='font-lato h-screen ml-[80%]'>
      <div className='h-full w-[17vw] flex flex-col bg-white shadow-xl' >
        
        {/* Task Details Header */}
        <div className='h-[9vh] w-full border-b-[3px]'>
          <div className='mx-[7%] pt-[7%] flex items-center justify-between'>
             <h1 className='text-[1.4em] font-semibold text-[#023047]'>Task Details</h1>
              <CgCloseR className='text-[#9D9D9D] text-[1.6em] hover:cursor-pointer hover:text-[#023047] hover:animate-shake'/>
          </div>
          <div className='mx-[7%] pt-[1%] flex items-center'>
              <p className='text-[#9D9D9D]'>Created at:</p>
              <p className='text-[#9D9D9D] font-semibold ml-[3%] '>January 13, 2024 12:34 AM</p>
          </div>
        </div>

        {/* Details */}
        <div className='h-[15vh] w-full'>

          {/* Title */}
          <div className='mx-[7%] pt-[7%] flex'>
              <TbTextSize className='text-[1.5em]' />
              <p className='text-[1.3em] font-semibold ml-[3%]'> Title</p>
          </div>
          <div className='ml-[16%] pt-[1%] flex'>
              <p className='text-[1.2em] text-[#023047] font-medium'>Wireframe</p>
          </div>

          {/* Description */}
          <div className='mx-[7%] pt-[10%] flex'>
              <GrTextAlignFull className='text-[1.5em]' />
              <p className='text-[1.3em] font-semibold ml-[3%]'> Task Description</p>
          </div>
          <div className='ml-[16%] pt-[1%] w-[11vw] flex'>
              <p className='text-[1.2em] text-[#023047] font-medium text-justify'>IT 3206 | Make a wireframe that changes my life The quick brown jumps over the lazy dog</p>
          </div>
          
          {/* Status */}
          <div className='mx-[7%] pt-[10%] flex'>
              <FaRegCheckCircle className='text-[1.5em]' />
              <p className='text-[1.3em] font-semibold ml-[3%]'> Status:</p>
          </div>
          <div className='ml-[16%] pt-[1%] w-[11vw] flex'>
             <div className='h-[3vh] w-[6vw] pt-[2%] bg-[#FB8500] text-center text-white font-bold rounded-lg'>
                <p className='text-[1.15em]'>Not Started</p>
             </div>
          </div>

        </div>

      </div>
    </div>  
  )
}

export default View