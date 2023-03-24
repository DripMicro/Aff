import type { Dispatch, SetStateAction } from "react";
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

const SingleLink = ({
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

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          activeLink(defaultLink);
          activeDropdown(dropdownName);
        }}
      >
        <Link
          className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center pl-8 hover:bg-white focus:outline-none dark:hover:bg-gray-600"
          href={
            "/affiliates/" +
            (parentLink == "" ? "" : parentLink + "/") +
            defaultLink
          }
        >
          <Image
            alt="..."
            className="w-6 border-none pt-0.5 align-middle"
            src={
              "/img/icons/" +
              dropdownName +
              (dropdown == dropdownName ? "Active" : "") +
              ".png"
            }
          />
          {collapseShow ? (
            <span
              className={
                "ml-4 truncate text-base font-medium tracking-wide " +
                (dropdown == dropdownName ? "text-[#2262C6]" : "")
              }
            >
              {navbarName}
            </span>
          ) : (
            ""
          )}
          <span className="ml-auto mr-8 truncate py-0.5 text-xs font-medium tracking-wide">
            <Image
              alt="..."
              className={
                "border-none align-middle" +
                (dropdown == dropdownName ? " w-3" : " w-2 ")
              }
              src={
                "/img/icons/Vector" +
                (dropdown == dropdownName ? "1" : "") +
                ".png"
              }
            />
          </span>
        </Link>
      </div>

      <ul
        className={
          "flex-col pt-2 " +
          (dropdown == dropdownName && collapseShow ? "flex" : "hidden")
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
                className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center pl-14 hover:bg-white focus:outline-none dark:hover:bg-gray-600"
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
                      (activeName == value.link ? "text-[#2262C6]" : "")
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

export default SingleLink;
