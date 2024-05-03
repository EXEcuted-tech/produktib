import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
import config from '../../common/config';
import logo from "../../assets/logo.png"
import { FaPlus,FaCircle, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Category from '../modal/Category';
import EditCategory from '../modal/EditCategory';
import { CatCardProps,SidebarProps } from '../../common/interface';

const Sidebar: React.FC<SidebarProps> = ({setChosenID}) => {
  const [category,setCategory] = useState<CatCardProps[]>([])
  const [currID,setCurrID] = useState(1);
  const [openCategory, setOpenCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);

  useEffect (()=>{
    axios.get(`${config.API}/category/retrieve_all`)
    .then((res)=>{
      if(res.data.success==true){
        setCategory(res.data.category);
        handleCategorySelection(1);
      }
    }).catch((error)=>{

    })
  },[])

  const handleButtonClick = () => {
    setOpenCategory(false);
    setOpenEditCategory(false);
  }

  const handleCatDropdown = () =>{
    setOpenEditCategory(true);
    setShowOptions(false);
  }

  const handleCategorySelection = (categoryId:number) => {
    // console.log("Sidebar Value: ",categoryId);
    localStorage.removeItem('category_id');
    setCurrID(categoryId);
    setChosenID(JSON.stringify(categoryId));
    localStorage.setItem('category_id', JSON.stringify(categoryId));
  }

  const toggleOptions = (catId:number) =>{

    if(activeCatId === catId){
        setShowOptions(!showOptions);
    }else{
        setShowOptions(true);
    }

    setActiveCatId(catId);
  }


  return (
    <div className='w-full h-full'>
        {openCategory && <Category handleButtonClick={handleButtonClick}/>}
        {openEditCategory && <EditCategory handleButtonClick={handleButtonClick}/>}
        <div className='bg-[#001A27] h-[8vh] rounded-tr-3xl dark:bg-[#1c1c1c]'>
            <img src={logo} alt="Produktib Logo" className="h-auto w-[15rem] py-[5%] pl-[10%]"></img>
        </div>
        <div className='bg-primary h-[92vh] dark:bg-[#292929]'>
            <div className='mx-[10%] pt-[7%] flex items-center'>
                <h1 className='font-bold text-[#D3D3D3] text-[1.15em] mr-[8%] dark:white'>TASK CATEGORIES</h1>
                <FaPlus className='text-[#D3D3D3] text-[1.15em] hover:cursor-pointer hover:text-white dark:text-white dark:hover:text-gray-500' onClick={() => setOpenCategory(true)}/>
            </div>

            {/* Category List */}
            <div className='pt-[2%]'>
                <ul>
                    {category.map((cat,index)=>(
                        <li className={`${cat.category_id == currID ? 'bg-[#085A83] dark:bg-white': 'bg-none'} py-[3%] hover:cursor-pointer`} 
                        onClick={() => handleCategorySelection(cat.category_id)}>
                        <div className='flex items-center justify-between mx-[10%]'>
                            <div className='flex items-center'>
                                <FaCircle className='mr-[5%] text-[1.15em]' style={{ color: cat.color }}/>
                                <p className={`text-[1.15em] text-white font-semibold ${cat.category_id == currID && 'dark:text-black'} `}>{cat.category_name}</p>
                            </div>
                            <BsThreeDotsVertical className={`hover:animate-shake text-white ${cat.category_id == currID && 'dark:text-black'}`}
                                onClick={()=>toggleOptions(cat.category_id)}/>
                            {(activeCatId === cat.category_id) && showOptions &&
                            <div className='animate-fade-in absolute bg-lightBlue ml-[11.2%] mt-[3%] rounded-[5px] text-[0.8em] w-[8%] ml-[1%] dark:bg-gray-500 z-0 drop-shadow-md'>
                                <ul className='z-[250]'>
                                    <li className='flex items-center py-[5%] pl-[6%] hover:bg-white hover:rounded-[5px] hover:cursor-pointer dark:text-white
                                        dark:hover:bg-gray-600' onClick={handleCatDropdown}>
                                        <FaPencilAlt/>
                                        <p className='ml-[3%]'>Edit Category</p>
                                    </li>
                                    <li className='flex items-center py-[5%] pl-[6%] hover:bg-white hover:rounded-[5px] hover:cursor-pointer dark:text-white
                                        dark:hover:bg-gray-600'>
                                        <FaTrashAlt/>
                                        <p className='ml-[3%]'>Delete Category</p>
                                    </li>
                                </ul>
                            </div>
                            }
                        </div>
                        </li>
                    ))}
                </ul>
                {/* Category Row */}

            </div>
        </div>        
    </div>
  )
}

export default Sidebar