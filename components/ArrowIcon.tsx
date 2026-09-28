type ArrowIconProps = {
  direction?: "up-right" | "down-right" | "up";
};

export default function ArrowIcon({ direction = "up-right" }: ArrowIconProps) {
  const rotation = { "up-right": 0, "down-right": 90, up: -45 }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <g transform={`rotate(${rotation} 12 12)`}>
        <path d="M5 19 19 5M5 5h14v14" />
      </g>
    </svg>
  );
}
