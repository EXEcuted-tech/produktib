import React, { useState } from 'react'
import { FaT, FaAlignLeft, FaAlignJustify } from "react-icons/fa6";


const Add = ({onSubmit, onCancel, onClose}) => {

    return(
        <div className='absolute w-full h-full overflow-auto text-2xl z-[100] backdrop-brightness-50'>
            <div className='w-[50%] h-[60%] ml-[33%] mr-auto mt-[10%] mb-auto rounded-2xl z-100'>
                <div className='flex w-full h-[20%] bg-[#023047] items-center rounded-2xl rounded-b-none dark:bg-black'>
                    <p className='text-white ml-[6%] text-4xl font-semibold '>Add Task</p>
                </div>
                <div className='flex w-full h-[80%] bg-[#F1F1F1] rounded-2xl rounded-t-none dark:border dark:border-black'>
                    <form className='w-[83%] ml-[8%] mt-[5%] mb-[3%]'>
                        <div className='mb-5'>
                            <div className='flex mb-2'>
                                <FaT className='text-xl mt-auto mb-auto'/>
                                <FaAlignLeft className='text-sm mt-[1.4%] mb-auto ml-[-1%]'/>
                                <p className='ml-[1%] text-2xl font-semibold '>Title</p>
                            </div>
                            <input type='text' className='w-[100%] p-4 pl-5 rounded-lg bg-[#FAFAFA] placeholder-gray-500 placeholder:font-bold font-bold border-[#FFB703] border-2 dark:border-black' placeholder="Enter Task Title" ></input>
                        </div>
                        <div className='mb-5'>
                            <div className='flex mb-2'>
                                <FaAlignJustify className='text-xl mt-auto mb-auto'/>
                                <p className='ml-[2%] text-2xl font-semibold'>Description</p>
                            </div>
                            <textarea id='description' className='w-full h-[8rem] p-2 pl-5 resize-none text-xl rounded-lg border-[#FFB703] border-2 dark:border-black' placeholder="Enter Task Description"></textarea>
                        </div>
                        <div className='flex justify-end'>
                            <button className="bg-[#D6D6D6] text-[#023047] text-2xl font-bold py-2.5 px-2.5 rounded dark:border-black dark:bg-white dark:text-black" onClick={()=> onCancel()}>Cancel</button>
                            <button type="submit" className="text-white ml-[3%] bg-[#FB8500] font-semibold py-2.5 px-6 rounded dark:bg-black" onClick={()=> onCancel()}>Save</button>
                        </div>

                    </form>
                    
                </div>
            </div>

        </div>
    )
}

export default Add