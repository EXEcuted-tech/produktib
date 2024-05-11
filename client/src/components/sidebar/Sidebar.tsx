import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../common/config";
import logo from "../../assets/logo.png";
import { FaPlus, FaCircle, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Category from "../modal/Category";
import EditCategory from "../modal/EditCategory";
import { CatCardProps, SidebarProps } from "../../common/interface";
import ThreeDots from "../loaders/threeDots";

const Sidebar: React.FC<SidebarProps> = ({ setChosenID }) => {
  const [category, setCategory] = useState<CatCardProps[]>([]);
  const [currID, setCurrID] = useState(localStorage.getItem("category_id")!="0" ? Number(localStorage.getItem("category_id")) : 1);
  const [openCategory, setOpenCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${config.API}/category/retrieve_all`)
      .then((res) => {
        if (res.data.success == true) {
          setCategory(res.data.category);
          //handleCategorySelection(1);
        }
      })
      .catch((error) => {});
  }, [loadingPage]);

  const handleButtonClick = () => {
    setOpenCategory(false);
    setOpenEditCategory(false);
  };

  const handleCatDropdown = (catId: number) => {
    setOpenEditCategory(true);
    setShowOptions(false);
    localStorage.setItem("cat_id", JSON.stringify(catId));
  };

  const handleCategorySelection = (categoryId: number,categoryTitle: string) => {
    console.log("Sidebar Value: ", categoryId);
    localStorage.removeItem("category_id");
    setCurrID(categoryId);
    setChosenID(JSON.stringify(categoryId));
    localStorage.setItem("category_id", JSON.stringify(categoryId));
    localStorage.setItem("cat_title", categoryTitle);
    //console.log(localStorage.getItem("category_id"));
  };

  const toggleOptions = (catId: number) => {
    if (activeCatId === catId) {
      setShowOptions(!showOptions);
    } else {
      setShowOptions(true);
    }

    setActiveCatId(catId);
  };

  const handleClick = (category_id) => {
    console.log("CATEGORY ID BEH: ", category_id);
    axios
      .post(`${config.API}/category/delete`, {
        category_id: category_id,
      })
      .then((res) => {
        if (res.status != 200) {
          console.error("FAILED TO DELETE", res);
        }
        window.location.reload();
      });
  };

  const truncateText = (text, maxLength) =>{
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  return (
    <div className="w-full h-full">
      {openCategory && <Category handleButtonClick={handleButtonClick} setLoadingPage={setLoadingPage} />}
      {openEditCategory && (
        <EditCategory handleButtonClick={handleButtonClick} />
      )}
      <div className="bg-[#001A27] h-[8vh] rounded-tr-3xl dark:bg-[#1c1c1c]">
        <img
          src={logo}
          alt="Produktib Logo"
          className="h-auto w-[15rem] py-[5%] pl-[10%]"
        ></img>
      </div>
      {loadingPage ?
      <ThreeDots/>
    :
      <div className="bg-primary h-[92vh] dark:bg-[#292929]">
        <div className="mx-[10%] pt-[7%] flex items-center">
          <h1 className="font-bold text-[#D3D3D3] text-[1.15em] mr-[7%] dark:white">
            TASK CATEGORIES
          </h1>
          <FaPlus
            className="text-[#D3D3D3] text-[1.15em] hover:cursor-pointer hover:text-white dark:text-white dark:hover:text-gray-500"
            onClick={() => setOpenCategory(true)}
          />
        </div>

        {/* Category List */}
        <div className="pt-[2%]">
          <ul>
            {category.map((cat, index) => (
              <li
                className={`${
                  cat.category_id == currID
                    ? "bg-[#085A83] dark:bg-white"
                    : "bg-none"
                } py-[3%] hover:cursor-pointer`}
                onClick={() => handleCategorySelection(cat.category_id,cat.category_name)}
              >
                <div className="flex items-center justify-between mx-[10%]">
                  <div className="flex items-center">
                    <FaCircle
                      className="text-[1.15em] mr-2"
                      style={{ color: cat.color }}
                    />
                    <div className="w-[5%]">
                      <p
                          className={`text-[1.15em] text-white font-semibold ${
                            cat.category_id == currID && "dark:text-black"
                          } max-w-[80px]`}
                        >
                          {truncateText(cat.category_name, 13)}
                        </p>
                    </div>
                  </div>
                  <BsThreeDotsVertical
                    className={`hover:animate-shake text-white ${
                      cat.category_id == currID && "dark:text-black"
                    }`}
                    onClick={() => toggleOptions(cat.category_id)}
                  />
                  {activeCatId === cat.category_id && showOptions && (
                    <div className="animate-fade-in absolute bg-lightBlue ml-[11.2%] mt-[3%] rounded-[5px] text-[0.8em] w-[8%] ml-[1%] dark:bg-gray-500 z-0 drop-shadow-md">
                      <ul className="z-[250]">
                        <li
                          className="flex items-center py-[5%] pl-[6%] hover:bg-white hover:rounded-[5px] hover:cursor-pointer dark:text-white
                                        dark:hover:bg-gray-600"
                          onClick={() => handleCatDropdown(cat.category_id)}
                        >
                          <FaPencilAlt />
                          <p className="ml-[3%]">Edit Category</p>
                        </li>
                        <li
                          className="flex items-center py-[5%] pl-[6%] hover:bg-white hover:rounded-[5px] hover:cursor-pointer dark:text-white
                                        dark:hover:bg-gray-600"
                        >
                          <FaTrashAlt />
                          <p className="ml-[3%]">Delete Category</p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {/* Category Row */}
        </div>
      </div>
      }
    </div>
  );
};

export default Sidebar;
