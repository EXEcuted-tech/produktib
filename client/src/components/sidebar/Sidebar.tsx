import React,{useEffect, useState} from 'react'
import logo from "../../assets/logo.png"
import { FaPlus,FaCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const Sidebar = () => {
  //Pag set lang ug interface diri Tyrone ako rani gi static for now
  const [catColor,setCatColor] = useState('');
  
  useEffect (()=>{
    setCatColor('#FFB703')
  },[])

  return (
    <div className='w-full h-full'>
        <div className='bg-[#001A27] h-[8vh] rounded-tr-3xl'>
            <img src={logo} alt="Produktib Logo" className="h-auto w-[15rem] py-[5%] pl-[10%]"></img>
        </div>
        <div className='bg-[#023047] h-[92vh]'>
            <div className='mx-[10%] pt-[7%] flex items-center'>
                <h1 className='font-bold text-[#D3D3D3] text-[1.15em] mr-[7%]'>TASK CATEGORIES</h1>
                <FaPlus className='text-[#D3D3D3] text-[1.15em] hover:cursor-pointer hover:text-white'/>
            </div>

            {/* Category List */}
            <div className='pt-[2%]'>
                <ul>
                    <li className='py-[2%] bg-[#085A83] hover:cursor-pointer'>
                    <div className='flex items-center justify-between mx-[10%]'>
                        <div className='flex items-center'>
                            <FaCircle className='mr-[5%] text-[1.15em]' style={{ color: catColor }}/>
                            <p className='text-[1.15em] text-white font-semibold'>Academics</p>
                        </div>
                        <BsThreeDotsVertical className='hover:animate-shake text-white'/>
                    </div>
                    </li>
                    <li className='py-[2%] hover:cursor-pointer hover:bg-[#085A83]'>
                    <div className='flex items-center justify-between mx-[10%]'>
                        <div className='flex items-center'>
                            <FaCircle className='mr-[5%] text-[1.15em] text-[#FB8500]'/>
                            <p className='text-[1.15em] text-white font-semibold'>Work</p>
                        </div>
                        <BsThreeDotsVertical className='hover:animate-shake text-white'/>
                    </div>
                    </li>
                </ul>
                {/* Category Row */}

            </div>
        </div>        
    </div>
  )
}

export default Sidebar