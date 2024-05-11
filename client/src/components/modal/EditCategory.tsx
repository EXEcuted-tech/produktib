import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TbTextSize, TbColorFilter } from "react-icons/tb";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Discard from "./Discard";
import axios from "axios";
import config from "../../common/config";
import { CatCardProps } from "../../common/interface";
import UserNotification from "../alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";
import BounceLoader from "react-spinners/ClipLoader";

const EditCategory = ({ handleButtonClick, setLoadingPage }) => {
  const [color, setColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [errMess,setErrMess] = useState("");
  const [loading,setLoading]=useState(false);

  const catID = localStorage.getItem("category_id");
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<CatCardProps>();

  const handleCircleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const editCategoryTask = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoadingPage(true)
    try {
      const response = await axios.post(`${config.API}/category/update`, {
        category_name: cat?.category_name,
        color: color,
        category_id: catID,
      });
      if (response.data.success === true) {
        setErrMess("");

        setTimeout(()=>{
          setLoading(false)
          setLoadingPage(false)
        },1000)
        
        handleButtonClick();
      } else {
        setLoadingPage(false)
        setLoading(false)
        setErrMess(response.data.error);
      }
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${config.API}/category/retrieve?col=category_id&val=${catID}`)
      .then((res) => {
        console.log("Response: ", res);
        if (res.data.success == true) {
          console.log(res.data.category[0]);
          setCat(res.data.category[0]);
          setColor(res.data.category[0].color);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  const handleCancel = () => {
    setShowDiscard(false);
  };

  const handleClose = () => {
    handleButtonClick();
    localStorage.removeItem("category_id");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCat((prevState) => ({
      ...(prevState as CatCardProps),
      [name]: value,
    }));
  };

  return (
    <div className="absolute font-montserrat z-[250]">
      {showDiscard && (
        <Discard onClose={handleButtonClick} onCancel={handleCancel} />
      )}
                  {errMess !='' && 
          <UserNotification
            icon={<AiFillExclamationCircle/>}
            logocolor='#ff0000'
            title="Error!"
            message={errMess}
          />
      }
      <form>
        <div className="animate-fade-in z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] w-[100vw] h-[100vh] backdrop-brightness-50">
          <div className="w-[50%] h-[55%] rounded-2xl shadow-xl bg-white mt-[10%] mb-auto ml-[33%] mr-auto justify-center">
            <div className="flex w-full h-[20%] bg-[#023047] items-center rounded-2xl rounded-b-none dark:bg-black">
              <p className="text-white w-[90%] text-4xl font-bold pl-[4%]">
                Edit Task Category
              </p>
              <IoCloseOutline
                className="text-white text-[3.5em] hover:text-gray-300 hover:cursor-pointer"
                onClick={handleClose}
              />
            </div>

            {/* Category Name */}
            <div>
              <div className="mx-[7%] pt-[4%] flex">
                <TbTextSize className="text-4xl ml-[1%]" />
                <p className="text-2xl font-semibold ml-[1%] mt-[0.4%]">
                  {" "}
                  Category Name
                </p>
              </div>
              <div className="ml-[8%] text-[1.2em] font-semibold mt-[1%]">
                <input
                  name="category_name"
                  type="text"
                  className="w-[92%] p-4 pl-5 rounded-xl bg-white border-[3px] border-[#FFB703] text-2xl
                            placeholder-gray-500 placeholder:font-bold font-bold"
                  value={cat?.category_name}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
            </div>

            {/* Color */}
            <div>
              <div className="mx-[7%] pt-[4%] flex">
                <TbColorFilter className="text-4xl ml-[1%]" />
                <p className="text-2xl font-semibold ml-[1%] mt-[0.4%]">
                  Color
                </p>
              </div>
              <div className="ml-[8%] mt-[1%] flex">
                <div
                  className="w-12 h-12 rounded-full mr-[2%] ml-[1%] hover:cursor-pointer drop-shadow-lg"
                  style={{ backgroundColor: color }}
                  onClick={handleCircleClick}
                ></div>
                <div>
                  <HexColorInput
                    name="color"
                    color={color}
                    onChange={setColor}
                    placeholder="Type a color"
                    prefixed
                    alpha
                    className="w-[100%] h-[5vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[10%]"
                  />
                </div>

                {showColorPicker && (
                  <div
                    className="absolute top-[61vh] left-[38%] animate-fade-in"
                    ref={colorPickerRef}
                  >
                    <HexColorPicker color={color} onChange={setColor} />
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-row justify-end mt-[2%]">
              <button
                className="py-[1%] px-[2%] text-[#023047] dark:hover:bg-slate-200 text-[1.3em] rounded-[3px] bg-[#D6D6D6] font-semibold mr-[2%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in"
                onClick={() => setShowDiscard(true)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-[1%] px-[3%] text-[1.3em] text-white rounded-[3px] bg-[#FB8500] dark:hover:bg-gray-800 font-semibold mr-[8%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in"
                onClick={(e) => editCategoryTask(e)}
              >
                  <div className="flex justify-evenly items-center duration-100">  
                    <BounceLoader color="#FFFFFF" loading={loading} /> Save
                  </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
