import React from "react";

interface Props {
  value: boolean | null | undefined;
}

export const AvailableColumn = ({ value }: Props) => {
  return value ? (
    <div className="flex justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
      >
        <path
          d="M0.951172 5.85409L4.28451 8.97909L10.9512 0.645752"
          stroke="#50B8B6"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  ) : (
    <div className="flex justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
      >
        <path
          d="M1.52576 8L4 5.52576L6.47424 8L8 6.47424L5.52576 4L8 1.52576L6.47424 0L4 2.47424L1.52576 0L0 1.52576L2.47424 4L0 6.47424L1.52576 8Z"
          fill="#FE6969"
        />
      </svg>
    </div>
  );
};
