import Reac,{useEffect, useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { TbTextSize, TbColorFilter } from "react-icons/tb";
import { HexColorPicker, HexColorInput } from "react-colorful";


const Category = (onButtonClick) => {
const [color, setColor] = useState("#FFB703");
const [showColorPicker, setShowColorPicker] = useState(false);

const handleCircleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className='font-lato z-[100]'>
        <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] w-[100vw] h-[100vh] backdrop-blur-sm'>
            <div className='w-[50%] h-[60%] rounded-lg shadow-xl bg-white mt-[10%] mb-auto ml-[33%] mr-auto justify-center'>
                <div className='flex w-full h-[20%] bg-[#023047] items-center rounded-2xl rounded-b-none dark:bg-black'>
                    <p className='text-white text-4xl font-semibold pl-[4%]'>Add Task Category</p>
                    <IoMdClose className='text-white text-[1.8em] mr-[3%] hover:cursor-pointer hover:animate-shake' onClick={() => onButtonClick()}/>
                </div>

                 {/* Category Name */}
                <div>
                    <div className='mx-[7%] pt-[5%] flex'>
                        <TbTextSize className='text-4xl ml-[1%]' />
                        <p className='text-2xl font-semibold ml-[1%] mt-[0.4%]'> Category Name</p>
                    </div>
                    <div className='ml-[8%] text-[1.2em] font-semibold mt-[1%]'>
                        <input 
                            type="text"
                            className='w-[85%] p-4 pl-5 rounded-xl bg-white border-[3px] border-[#FFB703] text-2xl'>
                        </input>
                    </div>
                </div>

                 {/* Color */}
                 <div>
                    <div className='mx-[7%] pt-[5%] flex'>
                        <TbColorFilter className='text-4xl ml-[1%]' />
                        <p className='text-2xl font-semibold ml-[1%] mt-[0.4%]'>Color</p>
                    </div>
                    <div className='ml-[8%] mt-[1%] flex'>
                        <div className='w-12 h-12 rounded-full mr-[3%] hover:cursor-pointer' 
                             style={{ backgroundColor: color }}
                             onClick={handleCircleClick}
                        >

                        </div>
                        <div>
                            <HexColorInput 
                                color={color} 
                                onChange={setColor} 
                                placeholder="Type a color" prefixed alpha
                                className='w-[100%] h-[5vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[10%]'
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
                 <div className='flex flex-row justify-end mt-[5%] mr-[11%]'>
                    <button className='text-2xl font-bold py-2.5 px-2.5 text-black rounded-lg bg-[#D6D6D6] font-semibold mr-[3%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in'>
                        Cancel</button>
                    <button className='text-2xl font-bold py-2.5 px-5 text-white rounded-lg bg-[#FB8500] font-semibold mr-[3%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in'>
                        Save</button>
                 </div>
            </div>

           
        </div>
    </div>
  )
}

export default Category