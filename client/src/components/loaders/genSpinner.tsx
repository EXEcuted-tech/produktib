import React from 'react'

const GenSpinner = () => {
  return (
    <div className='bg-[#F3F3F3] h-[91.9vh] pl-[48%] pt-[20%] '>
        <div className="flex">
            <div className="relative ">
                <div className="w-32 h-32 rounded-full absolute
            border-8 border-solid border-gray-200"></div>

                <div className="w-32 h-32 rounded-full animate-spin absolute
            border-8 border-solid border-slate-400 border-t-transparent"></div>
            </div>
        </div>
    </div>
  )
}

export default GenSpinner