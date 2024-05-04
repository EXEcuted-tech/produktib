import React,{useEffect, useState} from 'react'
import { TbTextSize } from "react-icons/tb";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

/*Ty kani niya gamita ang TaskProps sa  interface.ts*/
/*Nag-set napud kog localStorages sa IDs*/
import { TaskProps } from '../../common/interface';

const View = ({onClose}) => {
  return (
    <div className='overflow-hidden animate-slide-left absolute right-0 z-[250] font-montserrat h-screen'>
      <div className='h-full w-[23vw] flex flex-col bg-white shadow-xl drop-shadow-2xl' >
        
        {/* Task Details Header */}
        <div className='h-[13vh] w-full border-b-[1px] border-[#B3B3B3]'>
          <div className='mx-[7%] pt-[7%] flex items-center justify-between'>
             <h1 className='text-[2em] font-bold text-[#023047]'>Task Details</h1>
              <IoCloseOutline className='border border-[#D9D9D9] rounded-[5px] text-[#ACACAC] text-[2.2em] hover:cursor-pointer hover:text-[#023047] hover:border-[#023047] hover:animate-shake'
                onClick={onClose}/>
          </div>
          <div className='mx-[7%] pt-[1%] flex items-center'>
              <p className='text-[#9D9D9D]'>Created at</p>
              <p className='text-[#9D9D9D] font-semibold ml-[2%] '>January 13, 2024 12:34 AM</p>
          </div>
        </div>

        {/* Details */}
        <div className='h-[15vh] w-full'>

          {/* Title */}
          <div className='mx-[7%] pt-[7%] flex items-center'>
              <TbTextSize className='text-[1.5em]' />
              <p className='text-[1.3em] font-semibold ml-[3%]'> Title</p>
          </div>
          <div className='ml-[16%] pt-[1%] flex'>
              <p className='text-[1.2em] text-[#023047] font-regular'>Wireframe</p>
          </div>

          {/* Description */}
          <div className='items-center mx-[7%] pt-[10%] flex'>
              <GrTextAlignFull className='text-[1.5em]' />
              <p className='text-[1.3em] font-semibold ml-[3%]'> Task Description</p>
          </div>
          <div className='ml-[16%] pt-[1%] w-[17vw] flex'>
              <p className='text-[1.2em] text-[#023047] font-regular text-justify'>IT 3206 | Make a wireframe that changes my life The quick brown jumps over the lazy dog</p>
          </div>
          
          {/* Status */}
          <div className='mx-[7%] pt-[10%] flex items-center'>
              <FaRegCheckCircle className='text-[1.5em]' />
              <p className='text-[1.3em] font-semibold ml-[3%]'> Status:</p>
          </div>
          <div className='ml-[15%] mt-[2%] w-[11vw] flex'>
             <div className='py-[3%] px-[8%] bg-[#FB8500] text-center text-white font-bold rounded-lg'>
                <p className='text-[1.15em]'>Not Started</p>
             </div>
          </div>

        </div>

      </div>
    </div>  
  )
}

export default View