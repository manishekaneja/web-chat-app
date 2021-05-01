import { FC } from "react";

const DotsVerticalIcon: FC<IconProps<"none">> = ({
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
      <circle cx="12" cy="5" r="1" />
    </svg>
  );
};

export { DotsVerticalIcon };
