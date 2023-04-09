import { useState } from "react";

interface PropsType {
  propsdata: DataType;
}

interface DataType {
  title: string;
  time: string;
  content: string;
}

const AnnouncementsComponent = ({ propsdata }: PropsType) => {
  const [expanded1, setExpanded1] = useState(true);

  return (
    <div className="mt-4 flex h-auto cursor-pointer flex-col justify-between rounded-md  bg-[#F5F8FA] p-4 pt-3 transition-all duration-500 md:px-5">
      <div className="text-base font-medium md:text-xl ">
        {propsdata.title}
        <div className="mt-2 text-sm font-medium text-[#636363] md:mt-2.5">
          {propsdata.time}
        </div>
        <div
          className={
            "mt-3.5 p-3 text-base  font-medium  transition duration-150 ease-in-out  md:mt-4 md:pr-56 " +
            (expanded1 ? " max-h-9 truncate " : "")
          }
        >
          {propsdata.content}
        </div>
      </div>
      <div className="mt-5 flex md:mt-6">
        <button
          className="text-left text-sm  font-medium text-blue-500"
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
