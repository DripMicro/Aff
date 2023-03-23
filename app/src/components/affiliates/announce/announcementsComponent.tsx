import Affiliates from "../../../layouts/AffiliatesLayout";

import { useState } from "react";

interface Data {
  propsdata: object;
}

const AnnouncementsComponent = (props: Data) => {
  const [expanded1, setExpanded1] = useState(true);

  return (
    <div className="h-auto px-4 mt-4 md:px-5 pt-3 bg-[#F5F8FA] rounded-md  py-4 flex flex-col justify-between transition-all duration-500 cursor-pointer">
      <div className="text-base md:text-xl font-medium ">
        {props.propsdata.title}
        <div className="font-medium mt-2 md:mt-2.5 text-xs md:text-sm text-[#636363]">
          {props.propsdata.time}
        </div>
        <div
          className={
            "text-xs p-3 md:text-sm  md:pr-56  mt-3.5 md:mt-4 font-medium  transition duration-150 ease-in-out" +
            (expanded1 ? " max-h-9 truncate " : "")
          }
        >
          {props.propsdata.content}
        </div>
      </div>
      <div className="flex mt-5 md:mt-6">
        <button
          className="text-blue-500 text-left  font-medium text-sm"
          onClick={() => setExpanded1(!expanded1)}
        >
          {expanded1 ? "More" : "Less"}
          <div
            className={
              "ml-2 inline-flex items-center justify-center duration-300" +
              (expanded1 ? " rotate-180" : "")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
            >
              <path
                d="M6.29303 0.293031L0.586031 6.00003L6.29303 11.707L7.70703 10.293L3.41403 6.00003L7.70703 1.70703L6.29303 0.293031Z"
                fill="#2262C6"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsComponent;
