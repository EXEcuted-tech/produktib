import React,{useEffect, useState} from 'react'
import logo from "../../assets/logo.png"
import { FaPlus,FaCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Category from '../modal/Category';

const Sidebar = () => {
  //Pag set lang ug interface diri Tyrone ako rani gi static for now
  const [catColor,setCatColor] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  
  useEffect (()=>{
    setCatColor('#FFB703')
  },[])

  const handleButtonClick = () => {
    setOpenCategory(false);
  }

  return (
    <div className='w-full h-full'>
        {openCategory && <Category onCancel={handleButtonClick} onClose={handleButtonClick} onSubmit={handleButtonClick}/>}
        <div className='bg-[#001A27] h-[8vh] rounded-tr-3xl dark:bg-black'>
            <img src={logo} alt="Produktib Logo" className="h-auto w-[15rem] py-[5%] pl-[10%]"></img>
        </div>
        <div className='bg-primary h-[92vh] dark:bg-black'>
            <div className='mx-[10%] pt-[7%] flex items-center'>
                <h1 className='font-bold text-[#D3D3D3] text-[1.15em] mr-[7%] dark:text-gray-500'>TASK CATEGORIES</h1>
                <FaPlus className='text-[#D3D3D3] text-[1.15em] hover:cursor-pointer hover:text-white dark:text-gray-500 dark:hover:text-white' onClick={() => setOpenCategory(true)}/>
            </div>

            {/* Category List */}
            <div className='pt-[2%]'>
                <ul>
                    <li className='py-[2%] bg-[#085A83] hover:cursor-pointer dark:bg-white'>
                    <div className='flex items-center justify-between mx-[10%]'>
                        <div className='flex items-center'>
                            <FaCircle className='mr-[5%] text-[1.15em]' style={{ color: catColor }}/>
                            <p className='text-[1.15em] text-white font-semibold dark:text-gray-500'>Academics</p>
                        </div>
                        <BsThreeDotsVertical className='hover:animate-shake text-white dark:text-gray-500'/>
                    </div>
                    </li>
                    <li className='py-[2%] hover:cursor-pointer hover:bg-[#085A83] dark:hover:bg-white'>
                    <div className='flex items-center justify-between mx-[10%]'>
                        <div className='flex items-center'>
                            <FaCircle className='mr-[5%] text-[1.15em] text-[#FB8500]'/>
                            <p className='text-[1.15em] text-white font-semibold dark:text-gray-500'>Work</p>
                        </div>
                        <BsThreeDotsVertical className='hover:animate-shake text-white dark:text-gray-500'/>
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