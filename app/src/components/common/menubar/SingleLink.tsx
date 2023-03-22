import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

interface Props {
  activeName: string;
  collapseShow: boolean;
  setactiveName: Dispatch<SetStateAction<string>>;
  setdropdown: Dispatch<SetStateAction<string>>;
  link: string;
  linkName: string;
}

const SingleLink = ({
  setactiveName,
  setdropdown,
  activeName,
  collapseShow,
  link,
  linkName,
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
        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-white-800 pl-8"
        href={"/affiliates/" + link}
      >
        <Image
          alt="..."
          className="w-6 align-middle border-none pt-0.5"
          src={
            "/img/icons/" + link + (activeName == link ? "Active" : "") + ".png"
          }
        />
        {collapseShow ? (
          <span
            className={
              "ml-4 text-base font-medium tracking-wide truncate " +
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
