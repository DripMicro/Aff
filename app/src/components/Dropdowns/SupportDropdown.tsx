import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { createPopper } from "@popperjs/core";

type PixelMonitorData = {
  id: number;
  pixeltype: string;
  merchant: string[];
  creative: string[];
  pixelcode: string;
  type: string[];
  totalfired: number;
  method: string[];
  status: number;
};

const SupportDropDown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef: any = React.createRef();
  const popoverDropdownRef: any = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 px-1"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex h-0 items-center justify-start pl-2">
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
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "min-w-48 z-50 float-left list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <a
          href="#pablo"
          className={
            "text-blueGray-700 bg-transparent block w-full whitespace-nowrap py-2 px-4 text-sm font-normal"
          }
        >
          Edit
        </a>
        <a
          href="#pablo"
          className={
            "text-blueGray-700 bg-transparent block w-full whitespace-nowrap py-2 px-4 text-sm font-normal"
          }
        >
          Delete
        </a>
      </div>
    </>
  );
};

export default SupportDropDown;
