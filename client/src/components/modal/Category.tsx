import Reac, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TbTextSize, TbColorFilter } from "react-icons/tb";
import { HexColorPicker, HexColorInput } from "react-colorful";
import axios from "axios";
import config from "../../common/config";

const Category = ({ handleButtonClick }) => {
  const [catName, setCatName] = useState("");
  const [color, setColor] = useState("#FFB703");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleCircleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const editCategoryTask = async () => {
    try {
      const response = await axios.post(`${config.API}/category/create`, {
        category_name: catName,
        color: color,
      });
      if (response.status === 200) {
        console.log("Request created successfully", response.data);
      } else {
        console.error("Failed to create category", response.status);
      }
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  const handleSaveClick = async () => {
    await editCategoryTask();
  };

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

  return (
    <div className="absolute font-montserrat z-[250]">
      <form>
        <div className="animate-fade-in z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] w-[100vw] h-[100vh] backdrop-brightness-50">
          <div className="w-[50%] h-[55%] rounded-2xl shadow-xl bg-white mt-[10%] mb-auto ml-[33%] mr-auto justify-center">
            <div className="flex w-full h-[20%] bg-[#023047] items-center rounded-2xl rounded-b-none dark:bg-black">
              <p className="text-white w-[90%] text-4xl font-bold pl-[4%]">
                Add Task Category
              </p>
              <IoCloseOutline
                className="text-white text-[3.5em] hover:text-gray-300 hover:cursor-pointer"
                onClick={() => handleButtonClick()}
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
                  type="text"
                  className="w-[92%] p-4 pl-5 rounded-xl bg-white border-[3px] border-[#FFB703] text-2xl
                            placeholder-gray-500 placeholder:font-bold font-bold"
                  placeholder="Enter Category Name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
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
                  className="w-12 h-12 rounded-full mr-[3%] hover:cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={handleCircleClick}
                ></div>
                <div>
                  <HexColorInput
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
                className="py-[1%] px-[2%] text-[#023047] text-[1.3em] rounded-[3px] bg-[#D6D6D6] font-semibold mr-[2%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in"
                onClick={() => handleButtonClick()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-[1%] px-[3%] text-[1.3em] text-white rounded-[3px] bg-[#FB8500] font-semibold mr-[8%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in"
                onClick={() => handleSaveClick()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Category;
