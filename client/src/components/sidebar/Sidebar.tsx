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
import DeleteCat from "../modal/DeleteCat";

const Sidebar: React.FC<SidebarProps> = ({ setChosenID }) => {
  const [category, setCategory] = useState<CatCardProps[]>([]);
  const [currID, setCurrID] = useState(localStorage.getItem("category_id")!="0" ? Number(localStorage.getItem("category_id")) : 1);
  const [openCategory, setOpenCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);


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
    if(categoryId==1){
      localStorage.setItem("default_title",categoryTitle);
    }
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

  const handleClick = () => {
    var category_id = Number(localStorage.getItem('categoryz_id'));
    var defaultTitle = localStorage.getItem('default_title')!='' && localStorage.getItem('default_title');
    //console.log("CATEGORY ID BEH: ", category_id);
    setLoadingPage(true);
    axios
      .post(`${config.API}/category/delete`, {
        category_id: category_id,
      })
      .then((res) => {
        if (res.data.success === true) {
          setTimeout(()=>{
            setLoadingPage(false)
            handleCategorySelection(1,defaultTitle || "");
          },5000)
          setShowOptions(false);
        }
        
      });
  };

  const truncateText = (text, maxLength) =>{
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="w-full h-full">
       {showDelete && <DeleteCat onClose={handleButtonClick} handleClick={handleClick}/>}
      {openCategory && <Category handleButtonClick={handleButtonClick} setLoadingPage={setLoadingPage} />}
      {openEditCategory && (
        <EditCategory handleButtonClick={handleButtonClick} setLoadingPage={setLoadingPage}/>
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
                      <p
                          className={`text-[1.15em] text-white font-semibold ${
                            cat.category_id == currID && "dark:text-black"
                          } max-w-[100%]`}
                        >
                          {truncateText(cat.category_name, 13)}
                        </p>
                  </div>
                  <BsThreeDotsVertical
                    className={`hover:animate-shake text-white ${
                      cat.category_id == currID && "dark:text-black"
                    }`}
                    onClick={() => toggleOptions(cat.category_id)}
                  />
                  {activeCatId === cat.category_id && showOptions && (
                    <div 
                    ref={pickerRef}
                    className="animate-fade-in absolute bg-lightBlue mt-[3%] rounded-[5px] text-[0.8em] w-[8%] left-[12.5%] dark:bg-gray-500 z-[100] drop-shadow-md">
                      
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
                          onClick={()=>{
                            localStorage.setItem('categoryz_id',JSON.stringify(cat.category_id))
                            setShowDelete(true);
                           }
                          }
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
