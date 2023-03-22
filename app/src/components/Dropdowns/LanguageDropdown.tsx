import React from "react";
import { Image } from "@chakra-ui/react";
import { createPopper } from "@popperjs/core";

const LanguageDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef: any = React.createRef();
  const popoverDropdownRef: any = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [-60, 4],
          },
        },
      ],
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block md:pr-4"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-6 h-6 md:w-9 md:h-9 text-sm text-white inline-flex items-center justify-center rounded-full">
            <Image
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/icons/united-states.png"
            />
          </span>
          <span className="h-9 text-base text-[#303134] hidden md:inline-flex items-center justify-center font-semibold pl-2">
            English
          </span>
          <span
            className={
              (dropdownPopoverShow ? "rotate-180 " : "rotate-0 ") +
              "w-8 h-12 text-sm text-white inline-flex items-center justify-center rounded-full"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
            >
              <path d="M0 -5.24537e-07L6 6L12 0" fill="#A0A0A0" />
            </svg>
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg w-48"
        }
      >
        <div className="text-sm py-3 pl-6 font-normal w-full whitespace-nowrap bg-transparent flex">
          <span className="w-6 md:w-9 h-9 text-sm text-white inline-flex items-center justify-center rounded-full">
            <Image
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/icons/united-states.png"
            />
          </span>
          <span className="h-9 text-base text-[#303134] inline-flex items-center justify-center font-semibold pl-2">
            English
          </span>
        </div>
        <div className="text-sm py-3 pl-6 font-normal w-full whitespace-nowrap bg-transparent flex">
          <span className="w-6 md:w-9 h-9 text-sm text-white inline-flex items-center justify-center rounded-full">
            <Image
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/icons/spain.png"
            />
          </span>
          <span className="h-9 text-base text-[#303134] inline-flex items-center justify-center font-semibold pl-2">
            Spain
          </span>
        </div>
        <div className="text-sm py-3 pl-6 font-normal w-full whitespace-nowrap bg-transparent flex">
          <span className="w-6 md:w-9 h-9 text-sm text-white inline-flex items-center justify-center rounded-full">
            <Image
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/icons/france.png"
            />
          </span>
          <span className="h-9 text-base text-[#303134] inline-flex items-center justify-center font-semibold pl-2">
            French
          </span>
        </div>
      </div>
    </>
  );
};

export default LanguageDropdown;
