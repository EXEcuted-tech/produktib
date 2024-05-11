import React,{ useEffect, useState } from "react";
import { TbTextSize } from "react-icons/tb";
import { GrTextAlignFull } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import Discard from "./Discard";
import axios from "axios";
import config from "../../common/config";
import { TaskCardProps } from "../../common/interface";
import BounceLoader from "react-spinners/ClipLoader";
import UserNotification from "../alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";

const Edit = ({ onClose, onSubmit,setLoadingPage}) => {
  const [taskId, setTaskId] = useState<string | null>(null);
  
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [showDiscard, setShowDiscard] = useState(false);
  const [loading,setLoading]=useState(false);
  const [errMess,setErrMess]=useState("")


  const [task, setTask] = useState<TaskCardProps>();

  const taskID = localStorage.getItem("task_id");

  const editTask = async (e) => {
    e.preventDefault();

    setLoading(true);
    setLoadingPage(true);
    try {
      const response = await axios.post(`${config.API}/task/update`, {
        title: taskTitle,
        description: taskDesc,
        task_status: taskStatus,
        task_id: taskID,
      });
      console.log("Response?",response);
      if (response.data.success==true) {
        setErrMess("");

        setTimeout(()=>{
          setLoading(false)
          setLoadingPage(false)
        },1000)
        
        onSubmit();
      } else {
        setLoadingPage(false)
        setLoading(false)
        setErrMess(response.data.error);
      }
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  useEffect(() => {
    //console.log("Entered!");
    axios
      .get(`${config.API}/task/viewcol?col=task_id&val=${taskID}`)
      .then((res) => {

        if (res.data.success == true) {
          console.log(res.data.tasks[0]);
          setTaskTitle(res.data.tasks[0].title);
          setTaskDesc(res.data.tasks[0].description);
          setTaskStatus(res.data.tasks[0].task_status);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="absolute font-montserrat z-[250]">
      {errMess !='' && 
          <UserNotification
            icon={<AiFillExclamationCircle/>}
            logocolor='#ff0000'
            title="Error!"
            message={errMess}
          />
      }
      <div className="z-0 animate-fade-in absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] w-[100vw] h-[100vh] backdrop-brightness-50">
        <div className="h-[70%] w-[50%] rounded-2xl shadow-xl bg-white ml-[32%] mt-[7%] justify-center">
          <div className="h-[15%] w-full bg-[#023047] rounded-t-lg flex items-center dark:bg-black">
            <p className="text-white w-[84%] ml-[6%] text-[2em] font-bold ">
              Edit Task
            </p>
            <IoCloseOutline
              className="hover:animate-shake text-white text-[3em] hover:text-gray-300 hover:cursor-pointer"
              onClick={() => onClose()}
            />
          </div>

          {/* Task Name */}
          <div>
            <div className="mx-[5%] pt-[3%] flex items-center">
              <TbTextSize className="text-[1.5em]" />
              <p className="text-[1.3em] font-semibold ml-[1%]"> Title</p>
            </div>
            <div className="ml-[5%] text-[1.3em] font-bold mt-[1%]">
              <input
                type="text"
                name="title"
                value={taskTitle}
                className="dark:border-black w-[93%] h-[4vh] rounded-[15px] py-[3%] bg-white border-[3px] border-[#FFB703] px-[3%]"
                onChange={(e) => setTaskTitle(e.target.value)}
              ></input>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="mx-[5%] pt-[5%] flex items-center">
              <GrTextAlignFull className="text-[1.5em]" />
              <p className="text-[1.3em] font-semibold ml-[1%]">
                {" "}
                Task Description
              </p>
            </div>
            <div className="ml-[5%] text-[1.2em] mt-[1%]">
              <textarea
                name="description"
                value={taskDesc}
                className="dark:border-black w-[93%] h-[20vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[3%] py-[2%] text-justify resize-none"
                onChange={(e) => setTaskDesc(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row ml-[5%] pt-[4%]">
            <div
              className="relative flex items-center w-[28%] bg-white border-[1.5px] border-black hover:border-gray-500 rounded-[7px] shadow 
                                leading-tight focus:outline-none focus:shadow-outline pl-[2%] py-[0.5%]"
            >
              <h1 className="z-0 absolute top-[23%] text-[1.1em] font-semibold">
                Status:
              </h1>
              <div className="pl-[27%] py-[3%]">
                <select
                  className="pr-[40%] focus:outline-none"
                  name="task_status"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="w-[40%]"></div>
            <button
              className="py-[1%] dark:bg-slate-200 dark:hover:bg-slate-400 px-[2%] text-[#023047] text-[1.3em] rounded-[3px] bg-[#D6D6D6] font-semibold mr-[2%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in"
              onClick={() => onClose(true)}
            >
              Cancel
            </button>
            <button 
              className="py-[1%] px-[3%] dark:bg-black dark:hover:bg-gray-800 text-[1.3em] text-white rounded-[3px] bg-[#FB8500] font-semibold mr-[8%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in"
              onClick={(e) => editTask(e)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
