import React, { useState } from "react";
import { Button, Select } from "react-daisyui";
import InputForm from "../../components/LadingPage/InputForm";
import { IoSearch } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import {
  Banner,
  sectionOne,
  sectionThree,
  sectionTwo,
} from "../../assets/image-represent";
import { useTranslation } from "react-i18next";
import HeaderResponsive from "../../components/LadingPage/HeaderResponsive";

const Home: React.FC = () => {
  //Translation
  const { t } = useTranslation();

  const [value, setValue] = useState("default");
  return (
    <div>
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* Banner */}
      <div className=" relative">
        <div className=" absolute bottom-0 md:bottom-4 left-2  xl:top-[40%] xl:left-[20%]">
          <p className="font-bold text-md md:text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-white to-white dark:from-[#122969] dark:to-gray-100">
            {t("LandingPage.BannerTitle")}
          </p>
          <p className="font-light text-md text-transparent bg-clip-text bg-gradient-to-r from-white to-white dark:from-[#122969] dark:to-[#122969] ">
            {t("LandingPage.BannerSubtitle")}
          </p>
        </div>
        {/* Banner IMG */}
        <div>
          <img src={Banner} alt="Banner" />
        </div>
      </div>
      {/* Form */}
      <div className="px-2 flex flex-grow justify-center items-center  relative top-1 md:-top-3 xl:-top-10">
        <div
          className="flex flex-col xl:flex-row border border-primary border-opacity-50
         p-2 md:p-10 xl:py-8 xl:px-10 bg-white dark:bg-gray-700 rounded-lg shadow-headerMenu"
        >
          {/* Form Mobile 1 */}
          <div className="flex flex-grow xl:m-0 xl:gap-0 m-2 md:m-[10px] md:gap-[20px] gap-2 justify-between items-center">
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full  xl:rounded-r-none"
              type={""}
              placeholder={`${t("LandingPage.DeparturePlaceholder")}`}
            />
            <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden xl:flex" />
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full  xl:rounded-none"
              type={"text"}
              placeholder={`${t("LandingPage.DestinationPlaceholder")}`}
            />
            <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden xl:flex" />
          </div>
          {/* Form Mobile 2 */}
          <div className="flex flex-grow xl:m-0 xl:gap-0 m-2 md:m-[10px] md:gap-[20px] gap-2 justify-between items-center">
            {" "}
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={"date"}
              placeholder={`${t("LandingPage.DepartureDatePlaceholder")}`}
            />
            <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden xl:flex" />
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full  xl:rounded-none"
              type={"date"}
              placeholder={`${t("LandingPage.ReturnDatePlaceholder")}`}
            />{" "}
            <MdOutlineArrowRightAlt className="text-primary dark:text-white hidden xl:flex" />
          </div>
          {/* Form Mobile 3 */}
          <div className="flex flex-grow xl:m-0 xl:gap-0 m-2 md:m-[10px] md:gap-[20px] gap-2 justify-between items-center">
            <div>
              <Select
                className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none border border-opacity-50 border-gray-700 focus:border-primary dark:border-primary dark:focus:border-white "
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                <option value={"default"} disabled>
                  {t("LandingPage.AgeSelectDefault")}
                </option>
                <option value={"Người Nhỏ"}>Người Nhỏ</option>
                <option value={"Người Vừa"}>Người Vừa</option>
                <option value={"Người Lớn"}>Người Lớn</option>
              </Select>
            </div>
            <div>
              <Button className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:ml-3 bg-primary hover:bg-white text-sm hover:text-primary hover:border-primary text-white dark:hover:bg-gray-700">
                <IoSearch />
                {t("LandingPage.SearchButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="px-2 xl:px-0 flex flex-col md:flex-row justify-center items-center md:gap-20">
        <div className="w-[350px] flex flex-col justify-center items-center">
          <img width={300} src={sectionOne} alt="" />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            {t("LandingPage.SectionOneTitle")}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t("LandingPage.SectionOneDescription")}
          </p>
        </div>
        <div className="w-[350px] flex flex-col justify-center items-center">
          <img width={300} src={sectionTwo} alt="" />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            {t("LandingPage.SectionTwoTitle")}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t("LandingPage.SectionTwoDescription")}
          </p>
        </div>
        <div className="w-[350px] flex flex-col justify-center items-center">
          <img width={300} src={sectionThree} alt="" />
          <p className="font-bold dark:text-white text-[#122969] text-xl">
            {t("LandingPage.SectionThreeTitle")}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t("LandingPage.SectionThreeDescription")}
          </p>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Home;
