import { FC } from "react";

const SendRequestIcon: FC<IconProps<"none">> = ({
  size = 24,
  fill = "none",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="14" y1="12" x2="4" y2="12" />
      <line x1="14" y1="12" x2="10" y2="16" />
      <line x1="14" y1="12" x2="10" y2="8" />
      <line x1="20" y1="4" x2="20" y2="20" />
    </svg>
  );
};

export { SendRequestIcon };
