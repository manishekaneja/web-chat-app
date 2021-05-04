import { FC } from "react";

const ClockIcon: FC<IconProps<"none">> = ({ size = 24, fill = "none" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
};

export { ClockIcon };
