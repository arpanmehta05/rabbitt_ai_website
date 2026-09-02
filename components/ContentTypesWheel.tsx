const contentTypes = [
  { label: ["Articles"], from: "#f59e0b", to: "#fbbf24" },
  { label: ["Thought", "Leadership"], from: "#ea580c", to: "#fb923c" },
  { label: ["Script", "writing"], from: "#dc2626", to: "#fb7185" },
  { label: ["Product", "Descriptions"], from: "#be123c", to: "#f43f5e" },
  { label: ["Marketing", "Emails"], from: "#86198f", to: "#c026d3" },
  { label: ["Newsletters"], from: "#6d28d9", to: "#8b5cf6" },
  { label: ["Social Media", "Content"], from: "#3730a3", to: "#6366f1" },
  { label: ["Blogs"], from: "#1d4ed8", to: "#3b82f6" },
  { label: ["Website", "Content"], from: "#0369a1", to: "#22d3ee" },
  { label: ["Translation", "Services"], from: "#0f766e", to: "#2dd4bf" },
  { label: ["Ebooks &", "Guides"], from: "#047857", to: "#34d399" },
  { label: ["Technical", "Writing"], from: "#4d7c0f", to: "#a3e635" },
];

const center = 350;
const innerRadius = 116;
const outerRadius = 270;

function polar(radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  return [
    center + radius * Math.cos(radians),
    center + radius * Math.sin(radians),
  ];
}

function wedgePath(index: number) {
  const start = -90 + index * 30 + 0.8;
  const end = start + 28.4;
  const [ix1, iy1] = polar(innerRadius, start);
  const [ox1, oy1] = polar(outerRadius, start);
  const [ox2, oy2] = polar(outerRadius, end);
  const [ix2, iy2] = polar(innerRadius, end);
  return `M ${ix1} ${iy1} L ${ox1} ${oy1} A ${outerRadius} ${outerRadius} 0 0 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 0 0 ${ix1} ${iy1} Z`;
}

export default function ContentTypesWheel() {
  return (
    <div className="relative w-full max-w-[610px]">
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-sky-500/20 blur-3xl" />
      <svg
        viewBox="0 0 700 700"
        className="relative h-auto w-full drop-shadow-[0_22px_58px_rgba(0,0,0,0.62)]"
        role="img"
        aria-label="Content writing services wheel"
      >
        <defs>
          {contentTypes.map((item, index) => (
            <linearGradient
              key={item.label.join("-")}
              id={`content-wheel-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={item.from} />
              <stop offset="100%" stopColor={item.to} />
            </linearGradient>
          ))}
          <radialGradient id="wheel-hub" cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#14213a" />
            <stop offset="100%" stopColor="#050914" />
          </radialGradient>
        </defs>

        <circle
          cx={center}
          cy={center}
          r="302"
          fill="none"
          stroke="rgba(148,163,184,0.2)"
          strokeWidth="1"
        />
        <circle
          cx={center}
          cy={center}
          r="286"
          fill="none"
          stroke="rgba(125,211,252,0.22)"
          strokeWidth="1"
          strokeDasharray="5 8"
        />
        {contentTypes.map((item, index) => (
          <path
            key={item.label.join("-")}
            d={wedgePath(index)}
            fill={`url(#content-wheel-${index})`}
            stroke="#030712"
            strokeWidth="3"
          />
        ))}

        {contentTypes.map((item, index) => {
          const angle = -75 + index * 30;
          const [x, y] = polar(193, angle);
          return (
            <text
              key={`${item.label.join("-")}-label`}
              x={x}
              y={y - (item.label.length === 2 ? 6 : 0)}
              textAnchor="middle"
              fill="white"
              fontFamily="Arial, sans-serif"
              fontSize={item.label.length === 1 ? "13" : "12"}
              fontWeight="700"
              style={{ textShadow: "0 2px 5px rgba(0,0,0,0.8)" }}
            >
              <tspan x={x} dy="0">
                {item.label[0]}
              </tspan>
              {item.label[1] && (
                <tspan x={x} dy="15">
                  {item.label[1]}
                </tspan>
              )}
            </text>
          );
        })}

        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="url(#wheel-hub)"
          stroke="#67c6ff"
          strokeWidth="3"
        />
        <circle
          cx={center}
          cy={center}
          r="94"
          fill="none"
          stroke="rgba(125,211,252,0.22)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        <text
          x={center}
          y="328"
          textAnchor="middle"
          fill="#9ad5ff"
          fontFamily="Arial, sans-serif"
          fontSize="12"
          fontWeight="700"
          letterSpacing="3"
        >
          TYPES OF
        </text>
        <text
          x={center}
          y="360"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial, sans-serif"
          fontSize="29"
          fontWeight="800"
        >
          Content
        </text>
        <text
          x={center}
          y="391"
          textAnchor="middle"
          fill="#55b5ff"
          fontFamily="Arial, sans-serif"
          fontSize="29"
          fontWeight="800"
        >
          Writing
        </text>
      </svg>
    </div>
  );
}
