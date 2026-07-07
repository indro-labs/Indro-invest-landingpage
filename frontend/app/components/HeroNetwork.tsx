/**
 * Node mesh that crosses the hero copy — edges at the sides, lines through the center.
 */

type Node = { x: number; y: number; accent?: boolean };
type Edge = { from: number; to: number; accent?: boolean };

const NODES: Node[] = [
  /* left edge */
  { x: 6, y: 22 },
  { x: 14, y: 38 },
  { x: 8, y: 62 },
  { x: 22, y: 78 },
  /* center — runs behind headline */
  { x: 34, y: 42 },
  { x: 50, y: 46, accent: true },
  { x: 66, y: 44 },
  { x: 44, y: 54 },
  { x: 56, y: 38 },
  /* right edge */
  { x: 78, y: 18 },
  { x: 92, y: 32 },
  { x: 86, y: 58 },
  { x: 74, y: 82, accent: true },
  { x: 52, y: 88 },
  { x: 28, y: 86 },
];

const EDGES: Edge[] = [
  /* through the headline */
  { from: 4, to: 5 },
  { from: 5, to: 6, accent: true },
  { from: 4, to: 7 },
  { from: 7, to: 5 },
  { from: 5, to: 8 },
  /* left edge into center */
  { from: 0, to: 4 },
  { from: 1, to: 4 },
  { from: 2, to: 7 },
  { from: 2, to: 3 },
  { from: 3, to: 14 },
  /* right edge into center */
  { from: 9, to: 8 },
  { from: 10, to: 6 },
  { from: 11, to: 6 },
  { from: 11, to: 12 },
  { from: 12, to: 13 },
  { from: 13, to: 14 },
];

export default function HeroNetwork() {
  return (
    <div
      className="absolute inset-0 opacity-[0.38]"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {EDGES.map(({ from, to, accent }, i) => {
          const a = NODES[from];
          const b = NODES[to];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={accent ? "rgba(168, 85, 247, 0.18)" : "rgba(236, 236, 234, 0.055)"}
              strokeWidth={accent ? 0.08 : 0.065}
            />
          );
        })}
        {NODES.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.accent ? 0.42 : 0.28}
            fill={
              node.accent ? "rgba(168, 85, 247, 0.3)" : "rgba(236, 236, 234, 0.075)"
            }
          />
        ))}
      </svg>
    </div>
  );
}
