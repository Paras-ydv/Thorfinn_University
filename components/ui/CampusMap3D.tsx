"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MapPin, ThumbsUp, Clock, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BuildingType =
  | "academic"
  | "admin"
  | "library"
  | "sports"
  | "canteen"
  | "hostel"
  | "innovation"
  | "parking";

interface BuildingDef {
  id: string;
  name: string;
  x: number;
  z: number;
  w: number;
  h: number;
  d: number;
  type: BuildingType;
}

interface CampusEvent {
  buildingId: string;
  title: string;
  location: string;
  tag: string;
  votes: number;
  timeAgo: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BUILDING_COLORS: Record<BuildingType, { top: number; side: number }> = {
  academic:   { top: 0x3b82f6, side: 0x1d4ed8 },
  admin:      { top: 0x475569, side: 0x1e293b },
  library:    { top: 0xa855f7, side: 0x6d28d9 },
  sports:     { top: 0x22c55e, side: 0x15803d },
  canteen:    { top: 0xf97316, side: 0xc2410c },
  hostel:     { top: 0xf59e0b, side: 0xb45309 },
  innovation: { top: 0x06b6d4, side: 0x0e7490 },
  parking:    { top: 0x94a3b8, side: 0x64748b },
};

const LEGEND_LABELS: Partial<Record<BuildingType, string>> = {
  academic:   "Academic Block",
  admin:      "Admin / Auditorium",
  library:    "Library",
  sports:     "Sports Complex",
  canteen:    "Canteen / Food",
  hostel:     "Hostels",
  innovation: "Innovation Hub",
  parking:    "Parking",
};

const BUILDINGS: BuildingDef[] = [
  // ── North row
  { id: "admin",   name: "Admin Block",     x: -9,  z: -10, w: 4,   h: 2.5, d: 3,   type: "admin"      },
  { id: "cs",      name: "CS & IT Block",   x: -3,  z: -10, w: 5,   h: 3.5, d: 3,   type: "academic"   },
  { id: "ece",     name: "ECE Block",       x: 5,   z: -10, w: 4,   h: 3,   d: 3,   type: "academic"   },
  // ── Middle row
  { id: "mech",    name: "Mech Block",      x: -9,  z: -4,  w: 4,   h: 2.5, d: 3,   type: "academic"   },
  { id: "library", name: "Central Library", x: -1,  z: -5,  w: 3.5, h: 5,   d: 4,   type: "library"    },
  { id: "audi",    name: "Auditorium",      x: 5,   z: -4,  w: 4,   h: 3.5, d: 5,   type: "admin"      },
  // ── Lower-middle
  { id: "civil",   name: "Civil Block",     x: -9,  z: 3,   w: 4,   h: 2.5, d: 3,   type: "academic"   },
  { id: "mba",     name: "MBA Block",       x: -3,  z: 3,   w: 4,   h: 2.5, d: 3,   type: "academic"   },
  { id: "innov",   name: "Innovation Hub",  x: 5,   z: 3,   w: 4,   h: 3,   d: 4,   type: "innovation" },
  // ── South row
  { id: "canteen", name: "Food Court",      x: -9,  z: 9,   w: 4,   h: 1.5, d: 3,   type: "canteen"    },
  { id: "sports",  name: "Sports Complex",  x: -2,  z: 9,   w: 7,   h: 1,   d: 3,   type: "sports"     },
  { id: "parking", name: "Parking Area",    x: 7,   z: 9,   w: 4,   h: 0.3, d: 3,   type: "parking"    },
  // ── Hostels (south)
  { id: "bhostel", name: "Boys Hostel",     x: -9,  z: 15,  w: 4,   h: 4,   d: 3,   type: "hostel"     },
  { id: "ghostel", name: "Girls Hostel",    x: -3,  z: 15,  w: 4,   h: 4,   d: 3,   type: "hostel"     },
  { id: "health",  name: "Health Center",   x: 5,   z: 15,  w: 3,   h: 2,   d: 3,   type: "canteen"    },
];

const EVENTS: CampusEvent[] = [
  {
    buildingId: "cs",
    title: "Study group forming for Data Structures exam",
    location: "CS Block, Room 301",
    tag: "Academic",
    votes: 13,
    timeAgo: "11 min ago",
  },
  {
    buildingId: "library",
    title: "Quiet study zone open — grab a spot!",
    location: "Library, 2nd Floor",
    tag: "Academic",
    votes: 5,
    timeAgo: "45 min ago",
  },
  {
    buildingId: "canteen",
    title: "Free pizza — CS dept welcome event",
    location: "Food Court",
    tag: "Food",
    votes: 24,
    timeAgo: "6 min ago",
  },
  {
    buildingId: "sports",
    title: "Badminton court open — anyone interested?",
    location: "Sports Complex",
    tag: "Sports",
    votes: 8,
    timeAgo: "21 min ago",
  },
  {
    buildingId: "parking",
    title: "Street food stalls near parking lot today 5–8 PM",
    location: "Near Parking Entrance",
    tag: "Food",
    votes: 31,
    timeAgo: "3 min ago",
  },
];

const TAG_COLORS: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-700",
  Sports:   "bg-green-100 text-green-700",
  Food:     "bg-orange-100 text-orange-700",
  Social:   "bg-purple-100 text-purple-700",
  General:  "bg-slate-100 text-slate-600",
};

// ─── Helper: Create Building Mesh ─────────────────────────────────────────────

function makeBuilding(b: BuildingDef): THREE.Mesh {
  const { top, side } = BUILDING_COLORS[b.type];
  const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
  const mats = [
    new THREE.MeshLambertMaterial({ color: side }),  // +x
    new THREE.MeshLambertMaterial({ color: side }),  // -x
    new THREE.MeshLambertMaterial({ color: top  }),  // +y (top)
    new THREE.MeshLambertMaterial({ color: side }),  // -y
    new THREE.MeshLambertMaterial({ color: side }),  // +z
    new THREE.MeshLambertMaterial({ color: side }),  // -z
  ];
  const mesh = new THREE.Mesh(geo, mats);
  mesh.position.set(b.x, b.h / 2, b.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.buildingId = b.id;
  return mesh;
}

// ─── Helper: Create Tree ──────────────────────────────────────────────────────

function makeTree(x: number, z: number, scale = 1): THREE.Group {
  const group = new THREE.Group();
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x92400e });
  const foliageMat = new THREE.MeshLambertMaterial({ color: 0x166534 });

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12 * scale, 0.18 * scale, 0.9 * scale, 7),
    trunkMat
  );
  trunk.position.y = 0.45 * scale;
  trunk.castShadow = true;
  group.add(trunk);

  const f1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.85 * scale, 1.3 * scale, 7),
    foliageMat
  );
  f1.position.y = 1.5 * scale;
  f1.castShadow = true;
  group.add(f1);

  const f2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.6 * scale, 1 * scale, 7),
    foliageMat
  );
  f2.position.y = 2.2 * scale;
  f2.castShadow = true;
  group.add(f2);

  group.position.set(x, 0, z);
  return group;
}

// ─── Helper: Create Event Pin ─────────────────────────────────────────────────

function makePin(buildingH: number, bx: number, bz: number): THREE.Group {
  const group = new THREE.Group();

  const poleMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8),
    poleMat
  );
  pole.position.y = 0.9;
  group.add(pole);

  const headMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), headMat);
  head.position.y = 2.0;
  group.add(head);

  const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), dotMat);
  dot.position.y = 2.0;
  group.add(dot);

  group.position.set(bx + 0.6, buildingH, bz - 0.6);
  return group;
}

// ─── Helper: Road ─────────────────────────────────────────────────────────────

function makeRoad(
  scene: THREE.Scene,
  mat: THREE.Material,
  cx: number,
  cz: number,
  w: number,
  d: number
) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(cx, 0.01, cz);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

// ─── Helper: Flat Area (grass / lawn) ────────────────────────────────────────

function makeLawn(
  scene: THREE.Scene,
  cx: number,
  cz: number,
  w: number,
  d: number,
  color: number
) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshLambertMaterial({ color })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(cx, 0.015, cz);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CampusMap3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ── Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0ede4);
    scene.fog = new THREE.Fog(0xf0ede4, 60, 100);

    // ── Camera (orthographic → isometric feel)
    const frustum = 28;
    const aspect = W / H;
    const camera = new THREE.OrthographicCamera(
      (-frustum * aspect) / 2,
      (frustum * aspect) / 2,
      frustum / 2,
      -frustum / 2,
      0.1,
      500
    );
    camera.position.set(22, 22, 22);
    camera.lookAt(0, 0, 4);

    // ── Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff4d0, 1.2);
    sun.position.set(25, 35, 15);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -35;
    sun.shadow.camera.right = 35;
    sun.shadow.camera.top = 35;
    sun.shadow.camera.bottom = -35;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xd0e8ff, 0.3);
    fill.position.set(-20, 10, -20);
    scene.add(fill);

    // ── Ground
    const groundMat = new THREE.MeshLambertMaterial({ color: 0xc8b99a });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── Campus border wall (low)
    const wallMat = new THREE.MeshLambertMaterial({ color: 0xa09080 });
    [
      [-14, 4, 28,  0.5], // west
      [14,  4, 28,  0.5], // east
      [0, -13.5, 28, 0.5], // north (rotated)
      [0,  21.5, 28, 0.5], // south
    ].forEach(([x, z, len, h], i) => {
      const isNS = i >= 2;
      const ww = isNS ? len : 0.5;
      const wd = isNS ? 0.5 : len;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(ww, h, wd),
        wallMat
      );
      mesh.position.set(x, (h as number) / 2, z);
      scene.add(mesh);
    });

    // ── Roads
    const roadMat = new THREE.MeshLambertMaterial({ color: 0xb0a090 });
    // Main N-S road (centre)
    makeRoad(scene, roadMat, 0, 4, 2.5, 36);
    // Main E-W road (between rows 2 & 3)
    makeRoad(scene, roadMat, -1, 0, 28, 2.5);
    // E-W road between rows 3 & 4
    makeRoad(scene, roadMat, -1, 6.5, 28, 2.5);
    // E-W road south
    makeRoad(scene, roadMat, -1, 12.5, 28, 2);
    // Perimeter road (outer ring - simplified)
    makeRoad(scene, roadMat, 0, -12.5, 28, 2);

    // ── Lawns
    makeLawn(scene, -0.5, -2, 4, 5, 0x86ab6a);  // central upper lawn
    makeLawn(scene, 0, 5.5, 4, 1.5, 0x86ab6a);  // strip lawn
    makeLawn(scene, 1, 13, 5, 2.5, 0x7da05c);   // hostel lawn

    // ── Buildings
    const buildingMeshes: { mesh: THREE.Mesh; def: BuildingDef }[] = [];
    BUILDINGS.forEach((b) => {
      const mesh = makeBuilding(b);
      scene.add(mesh);
      buildingMeshes.push({ mesh, def: b });
    });

    // ── Trees
    const treeClusters: [number, number, number?][] = [
      // Central lawn
      [-2, -2], [1, -1.5], [-1.5, 0.5], [2, 0],
      // Around hostels
      [1, 13.5], [-1, 14], [3, 14.5],
      // East side
      [11, -7], [11, 0], [11, 6], [11, 12],
      // West side
      [-12, -7], [-12, 2], [-12, 10],
      // Around sports
      [-2, 11.5], [4, 11.5], [-5, 11],
    ];
    treeClusters.forEach(([x, z, s]) => {
      scene.add(makeTree(x as number, z as number, (s as number) ?? 1));
    });

    // ── Event pins
    const pinGroups: THREE.Group[] = [];
    EVENTS.forEach((ev) => {
      const b = BUILDINGS.find((bd) => bd.id === ev.buildingId);
      if (!b) return;
      const pin = makePin(b.h, b.x, b.z);
      scene.add(pin);
      pinGroups.push(pin);
    });

    // ── Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minZoom = 0.5;
    controls.maxZoom = 3;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 3;
    controls.target.set(0, 0, 4);
    controls.update();

    // ── Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / H) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(buildingMeshes.map((b) => b.mesh));
      mount.style.cursor = hits.length > 0 ? "pointer" : "grab";
    };

    const onClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / H) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(buildingMeshes.map((b) => b.mesh));
      if (hits.length > 0) {
        const id = hits[0].object.userData.buildingId as string;
        setSelectedId((prev) => (prev === id ? null : id));
      } else {
        setSelectedId(null);
      }
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("click", onClick);

    // ── Animation loop
    let frameId: number;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.025;
      // Pulse pins
      pinGroups.forEach((g, i) => {
        const s = 1 + Math.sin(t * 3 + i * 1.2) * 0.12;
        g.scale.setScalar(s);
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      const na = nw / nh;
      (camera as THREE.OrthographicCamera).left   = (-frustum * na) / 2;
      (camera as THREE.OrthographicCamera).right  = ( frustum * na) / 2;
      (camera as THREE.OrthographicCamera).top    =   frustum / 2;
      (camera as THREE.OrthographicCamera).bottom = -(frustum / 2);
      (camera as THREE.OrthographicCamera).updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("click", onClick);
      ro.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const selectedBuilding = BUILDINGS.find((b) => b.id === selectedId);
  const selectedEvents = EVENTS.filter((e) => e.buildingId === selectedId);
  const hasPins = EVENTS.some((e) => e.buildingId === selectedId);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: 520 }}>
      {/* Three.js canvas mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* ── Legend (top-left) */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl shadow p-3 space-y-1.5 text-xs">
        {(Object.entries(LEGEND_LABELS) as [BuildingType, string][]).map(([type, label]) => {
          const hex = "#" + BUILDING_COLORS[type].top.toString(16).padStart(6, "0");
          return (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: hex }} />
              <span className="text-slate-600 whitespace-nowrap">{label}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-2 pt-1.5 mt-1 border-t border-slate-100">
          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 animate-pulse" />
          <span className="text-slate-600">Live Event</span>
        </div>
      </div>

      {/* ── Event card (top-right) */}
      {selectedBuilding && (
        <div className="absolute top-3 right-3 bg-white shadow-lg rounded-2xl p-4 w-72 text-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-slate-900 text-base leading-tight">
                {selectedBuilding.name}
              </p>
              {hasPins && (
                <p className="text-xs text-red-500 font-medium mt-0.5 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-0.5" />
                  {selectedEvents.length} live event{selectedEvents.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map((ev) => (
                <div
                  key={ev.title}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <p className="text-slate-800 font-medium leading-snug text-sm mb-2">
                    {ev.title}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {ev.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ev.timeAgo}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        TAG_COLORS[ev.tag] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ev.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <ThumbsUp className="w-3 h-3" />
                      {ev.votes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-xs italic">No live events at this building right now.</p>
          )}
        </div>
      )}

      {/* ── Hint pill */}
      {!selectedBuilding && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/55 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none select-none">
          Click a building · Drag to orbit · Scroll to zoom
        </div>
      )}

      {/* ── Compass */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full w-11 h-11 flex flex-col items-center justify-center shadow text-[10px] font-bold text-slate-600 leading-tight">
        <span className="text-red-500">▲</span>
        <span>N</span>
      </div>
    </div>
  );
}
