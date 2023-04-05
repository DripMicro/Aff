import { createPopper } from "@popperjs/core";
import {
  AR,
  CN,
  ES,
  FR,
  IL,
  IT,
  JP,
  NL,
  PT,
  RU,
  US,
} from "country-flag-icons/react/3x2";
import React from "react";

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
          <span className="inline-flex h-6 w-6 items-center justify-center text-sm text-white md:h-9 md:w-9">
            <US className="align-middle shadow-lg" />
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
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <US className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            English
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <RU className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Russian
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <NL className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Dutch
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <ES className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Spain
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center   text-sm text-white md:w-9">
            <FR className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            French
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <IT className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Italian
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <AR className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Arabic
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <CN className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Chinese
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center   text-sm text-white md:w-9">
            <PT className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Portugese
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center  text-sm text-white md:w-9">
            <IL className="align-middle shadow-lg" />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Hebrew
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-3 pl-6 text-sm font-normal">
          <span className="inline-flex h-9 w-6 items-center justify-center rounded-full text-sm text-white md:w-9">
            <JP />
          </span>
          <span className="inline-flex h-9 items-center justify-center pl-2 text-base font-semibold text-[#303134]">
            Japanese
          </span>
        </div>
      </div>
    </>
  );
};

export default LanguageDropdown;
