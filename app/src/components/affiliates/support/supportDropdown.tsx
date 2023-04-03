import { createPopper } from "@popperjs/core";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const SupportDropdown = () => {
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
            offset: [-150, 4],
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
    <div>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="18"
          viewBox="0 0 4 18"
          fill="none"
        >
          <circle cx="2" cy="2" r="2" fill="#B8B8B8" />
          <circle cx="2" cy="9" r="2" fill="#B8B8B8" />
          <circle cx="2" cy="16" r="2" fill="#B8B8B8" />
        </svg>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "ml-36 block " : "hidden ") +
          " z-50 float-left w-32 list-none rounded bg-[#E3EEFF]  py-2 text-base shadow-lg"
        }
      >
        <div className="bg-transparent flex w-full whitespace-nowrap py-2 px-4 text-sm font-normal">
          <span className="inline-flex items-center justify-center pl-2">
            View
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-2 px-4 text-sm font-normal">
          <span className="pl-2">Update</span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-2 px-4 text-sm font-normal">
          <span className="pl-2">Delete</span>
        </div>
      </div>
    </div>
  );
};
