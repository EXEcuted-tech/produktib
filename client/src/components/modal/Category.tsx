import Reac,{useEffect, useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { TbTextSize, TbColorFilter } from "react-icons/tb";
import { HexColorPicker, HexColorInput } from "react-colorful";


const Category = () => {
const [color, setColor] = useState("#FFB703");
const [showColorPicker, setShowColorPicker] = useState(false);

const handleCircleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className='font-lato z-[100]'>
        <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] w-[100vw] h-[100vh] backdrop-blur-sm'>
            <div className='h-[30vh] w-[25vw] rounded-lg shadow-xl bg-white my-[20rem] mx-[60rem] justify-center'>
                <div className='h-[5vh] w-full bg-[#023047] rounded-t-lg flex items-center justify-between'>
                    <p className='text-white text-[1.3em] font-semibold pl-[4%]'>Add Task Category</p>
                    <IoMdClose className='text-white text-[1.8em] mr-[3%] hover:cursor-pointer hover:animate-shake'/>
                </div>

                 {/* Category Name */}
                <div>
                    <div className='mx-[7%] pt-[5%] flex'>
                        <TbTextSize className='text-[1.5em]' />
                        <p className='text-[1.3em] font-semibold ml-[3%]'> Category Name</p>
                    </div>
                    <div className='ml-[8%] text-[1.2em] font-semibold mt-[1%]'>
                        <input 
                            type="text" 
                            value={'asdasdad'} 
                            className='w-[20vw] h-[4vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[4%]'>
                        </input>
                    </div>
                </div>

                 {/* Color */}
                 <div>
                    <div className='mx-[7%] pt-[5%] flex'>
                        <TbColorFilter className='text-[1.5em]' />
                        <p className='text-[1.3em] font-semibold ml-[3%]'>Color</p>
                    </div>
                    <div className='ml-[8%] mt-[1%] flex'>
                        <div className='w-9 h-9 rounded-full mr-[3%] hover:cursor-pointer' 
                             style={{ backgroundColor: color }}
                             onClick={handleCircleClick}
                        >

                        </div>
                        <div>
                            <HexColorInput 
                                color={color} 
                                onChange={setColor} 
                                placeholder="Type a color" prefixed alpha
                                className='w-[5vw] h-[3.5vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[10%]'
                                 />
                        </div>
  
                        {showColorPicker && (
                        <div className='absolute top-[52vh] left-[44%] animate-fade-in'>
                        <HexColorPicker 
                          color={color} 
                          onChange={setColor}
                        />
                      </div>
                    )}
                    </div>
                </div>

                 {/* Buttons */}
                 <div className='flex flex-row justify-end'>
                    <button className='w-[5vw] h-[3.5vh] text-[1.1em] text-black rounded-lg bg-[#D6D6D6] font-semibold mr-[3%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in'>
                        Cancel</button>
                    <button className='w-[5vw] h-[3.5vh] text-[1.1em] text-white rounded-lg bg-[#FB8500] font-semibold mr-[3%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in'>
                        Save</button>
                 </div>
            </div>

           
        </div>
    </div>
  )
}

export default Category