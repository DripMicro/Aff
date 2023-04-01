import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

interface Props {
  activeName: string;
  collapseShow: boolean;
  dropdown: string;
  dropdownName: string;
  defaultLink: string;
  navbarName: string;
  parentLink: string;
  linkName: LinkName[];
  setactiveName: Dispatch<SetStateAction<string>>;
  setdropdown: Dispatch<SetStateAction<string>>;
}

interface LinkName {
  name: string;
  link: string;
}

const DropdownLink = ({
  setactiveName,
  setdropdown,
  activeName,
  collapseShow,
  dropdown,
  linkName,
  navbarName,
  dropdownName,
  parentLink,
  defaultLink,
}: Props) => {
  const activeLink = (value: string) => {
    setactiveName(value);
  };

  const activeDropdown = (value: string) => {
    setdropdown(value);
  };

  const activeDropdownVector = (value: boolean) => {
    setdropdownVector(value);
  };

  const activeOnLink = (value: boolean) => {
    setonLink(value);
  };

  const [dropdownVector, setdropdownVector] = useState(true);

  const [onLink, setonLink] = useState(false);

  console.log(`muly:DropdownLink ${activeName}`, {
    dropdown,
    dropdownName,
    collapseShow,
    dropdownVector,
  });

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          if (dropdown != dropdownName) activeDropdownVector(true);
          activeLink(defaultLink);
          activeDropdown(dropdownName);
        }}
      >
        <Link
          className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center justify-between pl-8 hover:bg-white focus:outline-none dark:hover:bg-gray-600"
          href={
            "/affiliates/" +
            (parentLink == "" ? "" : parentLink + "/") +
            defaultLink
          }
          onClick={() => {
            activeOnLink(true);
          }}
        >
          <div className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center hover:bg-white focus:outline-none dark:hover:bg-gray-600">
            <Image
              alt="..."
              className="w-6 border-none pt-0.5 align-middle"
              src={
                "/img/icons/" +
                dropdownName +
                (dropdown == dropdownName && onLink ? "Active" : "") +
                ".png"
              }
            />
            {collapseShow ? (
              <span
                className={
                  "ml-4 truncate text-base font-medium tracking-wide " +
                  (dropdown == dropdownName && onLink ? "text-[#2262C6]" : "")
                }
              >
                {navbarName}
              </span>
            ) : (
              ""
            )}
          </div>
          <div
            className="mr-8 truncate py-0.5 text-xs font-medium tracking-wide"
            onClick={(e) => {
              e.preventDefault();
              console.log(dropdownVector);
              activeDropdownVector(!dropdownVector);
            }}
          >
            <Image
              alt="..."
              className={
                "border-none align-middle" +
                (dropdownVector && dropdown == dropdownName ? " w-3" : " w-2 ")
              }
              src={
                "/img/icons/Vector" +
                (dropdownVector && dropdown == dropdownName ? "1" : "") +
                ".png"
              }
            />
          </div>
        </Link>
      </div>

      <ul
        className={
          "flex-col pt-2 duration-300 " +
          (dropdown == dropdownName && collapseShow && dropdownVector
            ? "flex"
            : "hidden")
        }
      >
        {linkName.map((value, index) => (
          <li key={index}>
            <div
              onClick={(e) => {
                e.preventDefault();
                setactiveName(value.link);
              }}
            >
              <Link
                className="text-white-600 hover:text-white-800 relative flex h-9 flex-row items-center pl-14 hover:bg-white focus:outline-none dark:hover:bg-gray-600"
                href={
                  "/affiliates/" +
                  (parentLink == "" ? "" : parentLink + "/") +
                  value.link
                }
              >
                {collapseShow ? (
                  <span
                    className={
                      "ml-4 truncate text-base font-medium tracking-wide " +
                      (activeName == value.link && onLink
                        ? "text-[#2262C6]"
                        : "")
                    }
                  >
                    {value.name}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DropdownLink;
