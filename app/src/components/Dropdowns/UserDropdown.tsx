import React from "react";
import { createPopper } from "@popperjs/core";
import { Image } from "@chakra-ui/react";

const UserDropdown = () => {
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
            offset: [-50, 4],
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
      <span className="hidden h-9 items-center justify-center pr-2 text-base font-semibold text-[#303134] md:inline-flex">
        James Blunt
      </span>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex items-center">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm text-white md:h-9 md:w-9">
            <Image
              alt="..."
              className="w-full rounded-full border-none align-middle shadow-lg"
              src="/img/icons/user.png"
            />
          </span>
          <span
            className={
              (dropdownPopoverShow ? "rotate-180 " : "rotate-0 ") +
              "inline-flex h-12 w-10 items-center justify-center rounded-full text-sm text-white"
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
          "z-50 float-left w-32 list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <div className="bg-transparent flex w-full whitespace-nowrap py-2 px-4 text-sm font-normal">
          <span className="inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M6 0.333252C5.34073 0.333252 4.69626 0.528748 4.1481 0.89502C3.59994 1.26129 3.17269 1.78189 2.9204 2.39097C2.66811 3.00006 2.6021 3.67028 2.73072 4.31689C2.85933 4.96349 3.1768 5.55743 3.64298 6.02361C4.10915 6.48978 4.7031 6.80725 5.3497 6.93587C5.9963 7.06449 6.66652 6.99848 7.27561 6.74618C7.8847 6.49389 8.40529 6.06665 8.77157 5.51849C9.13784 4.97032 9.33333 4.32586 9.33333 3.66659C9.33333 2.78253 8.98214 1.93468 8.35702 1.30956C7.7319 0.684441 6.88406 0.333252 6 0.333252ZM6 5.66659C5.60444 5.66659 5.21776 5.54929 4.88886 5.32952C4.55996 5.10976 4.30362 4.7974 4.15224 4.43195C4.00087 4.0665 3.96126 3.66437 4.03843 3.2764C4.1156 2.88844 4.30608 2.53208 4.58579 2.25237C4.86549 1.97267 5.22186 1.78219 5.60982 1.70501C5.99778 1.62784 6.39991 1.66745 6.76537 1.81883C7.13082 1.9702 7.44318 2.22655 7.66294 2.55544C7.8827 2.88434 8 3.27102 8 3.66659C8 4.19702 7.78929 4.70573 7.41421 5.0808C7.03914 5.45587 6.53043 5.66659 6 5.66659ZM12 12.9999V12.3333C12 11.0956 11.5083 9.90859 10.6332 9.03342C9.758 8.15825 8.57101 7.66659 7.33333 7.66659H4.66667C3.42899 7.66659 2.242 8.15825 1.36683 9.03342C0.491665 9.90859 0 11.0956 0 12.3333V12.9999H1.33333V12.3333C1.33333 11.4492 1.68452 10.6014 2.30964 9.97623C2.93477 9.35111 3.78261 8.99992 4.66667 8.99992H7.33333C8.21739 8.99992 9.06524 9.35111 9.69036 9.97623C10.3155 10.6014 10.6667 11.4492 10.6667 12.3333V12.9999H12Z"
                fill="#404040"
              />
            </svg>
          </span>
          <span className="inline-flex items-center justify-center pl-2">
            Profile
          </span>
        </div>
        <div className="bg-transparent flex w-full whitespace-nowrap py-2 px-4 text-sm font-normal">
          <span className="inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.6668 8.66659V7.33325H4.66683V5.33325L1.3335 7.99992L4.66683 10.6666V8.66659H10.6668Z"
                fill="#404040"
              />
              <path
                d="M13.3333 2H7.33333C6.598 2 6 2.598 6 3.33333V6H7.33333V3.33333H13.3333V12.6667H7.33333V10H6V12.6667C6 13.402 6.598 14 7.33333 14H13.3333C14.0687 14 14.6667 13.402 14.6667 12.6667V3.33333C14.6667 2.598 14.0687 2 13.3333 2Z"
                fill="#404040"
              />
            </svg>
          </span>
          <span className="pl-2">Log Out</span>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
