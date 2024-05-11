import axios from "axios";
import React, { useState } from "react";
import { FaT, FaAlignLeft, FaAlignJustify } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import config from "../../common/config";
import BounceLoader from "react-spinners/ClipLoader";
import UserNotification from "../alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";

const Add = ({ onSubmit, onCancel, setLoadingPage }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMess,setErrMess] = useState("");
  
  const catID = localStorage.getItem("category_id");

  const addTask = (e) => {
    e.preventDefault();
    //console.log(catID);
    setLoading(true);
    setLoadingPage(true);
    try {
      axios.post(`${config.API}/task/create`, {
        category_id: catID,
        title: taskTitle,
        description: taskDesc,
      }).then((res) =>{
        console.log("Response, ",res);
        if(res.data.success === true){
          setErrMess("");

          setTimeout(()=>{
            setLoading(false)
            setLoadingPage(false)
          },1000)
          
          onSubmit();
        }else{
          setLoadingPage(false)
          setLoading(false)
          setErrMess(res.data.error);
        }
        //console.log("Request created successfully", response.data);
      })
      .catch((error) => {
        console.log("Error: ",error);
      });

    } catch (error) {
        //console.error("Error creating category", error);
    }
  };

  return (
    <div className="animate-fade-in absolute w-full h-full overflow-auto text-2xl z-[100] backdrop-brightness-50">
      {errMess !='' && 
          <UserNotification
            icon={<AiFillExclamationCircle/>}
            logocolor='#ff0000'
            title="Error!"
            message={errMess}
          />
      }
      <div className="w-[50%] h-[60%] ml-[33%] mr-auto mt-[10%] mb-auto rounded-2xl z-100">
        <div className="flex items-center w-full h-[20%] bg-[#023047] items-center rounded-2xl rounded-b-none dark:bg-black">
          <p className="text-white w-[85%] ml-[6%] text-4xl font-bold ">
            Add Task
          </p>
          <IoCloseOutline
            className="text-white text-[2em] hover:text-gray-300 hover:cursor-pointer"
            onClick={() => onCancel()}
          />
        </div>
        <div className="flex w-full h-[80%] bg-[#F1F1F1] rounded-2xl rounded-t-none dark:border dark:border-black">
          <form className="w-[83%] ml-[8%] mt-[3%] mb-[2%]">
            <div className="mb-[3%]">
              <div className="flex mb-2">
                <FaT className="text-xl mt-auto mb-auto" />
                <FaAlignLeft className="text-sm mt-[1.4%] mb-auto ml-[-1%]" />
                <p className="ml-[1%] text-2xl font-semibold ">Title</p>
              </div>
              <input
                id="title"
                type="text"
                className="w-[100%] p-4 pl-5 rounded-[15px] bg-[#FAFAFA] placeholder-gray-500 placeholder:font-bold font-bold border-[#FFB703] border-2 dark:border-black"
                placeholder="Enter Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              ></input>
            </div>
            <div className="mb-[2%]">
              <div className="flex mb-2">
                <FaAlignJustify className="text-xl mt-auto mb-auto" />
                <p className="ml-[2%] text-2xl font-semibold">Description</p>
              </div>
              <textarea
                id="description"
                className="w-full h-[8rem] p-2 pl-5 resize-none text-xl rounded-lg border-[#FFB703] border-2 dark:border-black"
                placeholder="Enter Task Description"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-[#D6D6D6] text-[#023047] text-2xl font-bold py-2.5 px-2.5 rounded-[3px] dark:border-black dark:bg-white dark:text-black
                                               hover:bg-[#b0b0b0] hover:text-[#00314a] dark:hover:bg-slate-200 transition-colors delay-250 duration-[3000] ease-in"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex text-white ml-[3%] bg-[#FB8500] font-semibold py-2.5 px-6 rounded-[3px] dark:bg-black
                                                            hover:bg-[#FF9925] dark:hover:bg-gray-800 transition-colors delay-250 duration-[3000] ease-in"
                onClick={(e) => addTask(e)}
              >
                 <div className="flex justify-evenly items-center duration-100">  
                    <BounceLoader color="#FFFFFF" loading={loading} /> Save
                    </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
