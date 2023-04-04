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
        <div className="flex items-center">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-sm text-white md:h-9 md:w-9">
            <Image
              alt="..."
              className="w-full rounded-full border-none align-middle shadow-lg"
              src="/img/icons/united-states.png"
            />
          </span>
          <span className="hidden h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134] md:inline-flex">
            English
          </span>
          <span
            className={
              (dropdownPopoverShow ? "rotate-180 " : "rotate-0 ") +
              "inline-flex h-12 w-8 items-center justify-center rounded-full text-sm text-white"
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
          "z-50 float-left w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center rounded-full text-sm text-white md:w-9">
            <Image
              alt="..."
              className="w-full rounded-full border-none align-middle shadow-lg"
              src="/img/icons/united-states.png"
            />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            English
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center rounded-full text-sm text-white md:w-9">
            <Image
              alt="..."
              className="w-full rounded-full border-none align-middle shadow-lg"
              src="/img/icons/spain.png"
            />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Spain
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center rounded-full text-sm text-white md:w-9">
            <Image
              alt="..."
              className="w-full rounded-full border-none align-middle shadow-lg"
              src="/img/icons/france.png"
            />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            French
          </span>
        </div>
      </div>
    </>
  );
};

export default LanguageDropdown;
