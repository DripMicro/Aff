import { Image } from "@chakra-ui/react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  activeName: string;
  collapseShow: boolean;
  setactiveName: Dispatch<SetStateAction<string>>;
  setdropdown: Dispatch<SetStateAction<string>>;
  link: string;
  linkName: string;
  setCollapseShow: Dispatch<SetStateAction<boolean>>;
}

const SingleLink = ({
  setactiveName,
  setdropdown,
  activeName,
  collapseShow,
  link,
  linkName,
  setCollapseShow,
}: Props) => {
  const activeLink = (value: string) => {
    setactiveName(value);
  };

  const activeDropdown = (value: string) => {
    setdropdown(value);
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        activeLink(link);
        activeDropdown("");
      }}
    >
      <Link
        className="text-white-600 hover:text-white-800 dark:hover:bg-gray-600 relative flex h-11 flex-row items-center pl-8 hover:bg-white focus:outline-none"
        href={"/affiliates/" + link}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            setCollapseShow(!collapseShow);
          }}
        >
          <Image
            alt="..."
            className="w-6 border-none pt-0.5 align-middle"
            src={
              "/img/icons/" +
              link +
              (activeName == link ? "Active" : "") +
              ".png"
            }
          />
        </div>
        {collapseShow ? (
          <span
            className={
              "ml-4 truncate text-base font-medium tracking-wide " +
              (activeName == link ? "text-[#2262C6]" : "")
            }
          >
            {linkName}
          </span>
        ) : (
          ""
        )}
      </Link>
    </div>
  );
};

export default SingleLink;
