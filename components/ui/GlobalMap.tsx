"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MARKERS = [
  { name: "USA",       coords: [-100, 40] as [number, number], alumni: 8500  },
  { name: "Canada",    coords: [-106, 56] as [number, number], alumni: 2400  },
  { name: "UK",        coords: [-3,   55] as [number, number], alumni: 3200  },
  { name: "Germany",   coords: [10,   51] as [number, number], alumni: 1800  },
  { name: "India",     coords: [78,   21] as [number, number], alumni: 28000 },
  { name: "Singapore", coords: [103,   1] as [number, number], alumni: 2100  },
];

export function GlobalMap() {
  const [tooltip, setTooltip] = useState<{ name: string; alumni: number; x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-[#f8fafc] border border-slate-200">
      <ComposableMap
        projectionConfig={{ scale: 147, center: [15, 10] }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e2e8f0"
                stroke="#f1f5f9"
                strokeWidth={0.5}
                style={{
                  default:  { outline: "none" },
                  hover:    { fill: "#cbd5e1", outline: "none" },
                  pressed:  { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {MARKERS.map((m) => (
          <Marker
            key={m.name}
            coordinates={m.coords}
            onMouseEnter={(e: React.MouseEvent) => {
              const rect = (e.currentTarget as SVGElement)
                .closest("svg")!
                .getBoundingClientRect();
              const svgEl = (e.currentTarget as SVGElement).closest("svg")!;
              const pt = (svgEl as SVGSVGElement).createSVGPoint();
              pt.x = e.clientX;
              pt.y = e.clientY;
              setTooltip({ name: m.name, alumni: m.alumni, x: e.clientX - rect.left, y: e.clientY - rect.top });
              setHovered(m.name);
            }}
            onMouseLeave={() => { setTooltip(null); setHovered(null); }}
          >
            {/* Pulse ring */}
            <circle
              r={hovered === m.name ? 11 : 8}
              fill="#2563eb"
              fillOpacity={0.15}
              style={{ transition: "r 0.2s ease" }}
            />
            {/* Dot */}
            <circle
              r={hovered === m.name ? 6 : 4.5}
              fill="#2563eb"
              stroke="#ffffff"
              strokeWidth={1.5}
              style={{
                transition: "r 0.2s ease, filter 0.2s ease",
                filter: hovered === m.name
                  ? "drop-shadow(0 0 6px rgba(37,99,235,0.7))"
                  : "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                cursor: "pointer",
              }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 36 }}
        >
          <div className="bg-[#0f172a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {tooltip.name} — {tooltip.alumni.toLocaleString()} Alumni
            <div className="absolute left-0 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#0f172a] ml-3" />
          </div>
        </div>
      )}
    </div>
  );
}
