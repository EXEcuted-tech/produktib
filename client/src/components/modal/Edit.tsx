import React, { useEffect, useState } from "react";
import { TbTextSize } from "react-icons/tb";
import { GrTextAlignFull } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import Discard from "./Discard";
import axios from "axios";
import config from "../../common/config";

const Edit = ({ onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [showDiscard, setShowDiscard] = useState(false);

  const handleCancel = () => {
    setShowDiscard(false);
  };

  const catID = localStorage.getItem("category_id");
  const taskID = localStorage.getItem("task_id");

  useEffect(() => {
    axios
      .get(
        `${config.API}/task/retrieve?col1=category_id&val1=${catID}&col2=task_id&val2=${taskID}&order=DESC`
      )
      .then((res) => {
        console.log("Response: ", res);
        if (res.data.success == true) {
          console.log("Task Identifier:", res.data.category[0].task_id);
          setTaskTitle(res.data.tasks[0].title);
          setTaskDesc(res.data.tasks[0].description);
          setTaskStatus(res.data.tasks[0].task_status);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="absolute font-montserrat z-[250]">
      {showDiscard && <Discard onClose={onClose} onCancel={handleCancel} />}
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
                value={taskTitle}
                className="w-[93%] h-[4vh] rounded-[15px] py-[3%] bg-white border-[3px] border-[#FFB703] px-[3%]"
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
                value={taskDesc}
                className="w-[93%] h-[20vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[3%] py-[2%] text-justify resize-none"
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
              className="py-[1%] px-[2%] text-[#023047] text-[1.3em] rounded-[3px] bg-[#D6D6D6] font-semibold mr-[2%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in"
              onClick={() => setShowDiscard(true)}
            >
              Cancel
            </button>
            <button className="py-[1%] px-[3%] text-[1.3em] text-white rounded-[3px] bg-[#FB8500] font-semibold mr-[8%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
