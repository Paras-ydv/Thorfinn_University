"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Shield, Wifi, Utensils, Dumbbell, BookOpen, Wind } from "lucide-react";

const ODIN_IMAGES = [
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774615779/hostel_1_o3ijhk.jpg",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774615761/hostel1-2_bjm1g7.jpg",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774615756/hostel1-3_bm7ixk.jpg",
];

const LOKI_IMAGES = [
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616164/397e8292-6f01-44b3-b271-2b12c7cb9f2f.png",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616182/51b5f2d2-31bd-4fd1-8b5c-e138e20c328d.png",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616261/hostel2_dc9rqa.jpg",
];

function SliderCard({ images, name, type, accentClass, capacity, rooms, amenities }: {
  images: string[]; name: string; type: string; accentClass: string;
  capacity: number; rooms: string; amenities: string[];
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 2000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-44 overflow-hidden">
        {images.map((src, i) => (
          <img key={src} src={src} alt={`${name} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-xl">{name}</h3>
          <span className={`text-xs font-bold px-2.5 py-1 rounded ${accentClass}`}>{type}</span>
        </div>
        <div className="space-y-2 text-sm border-t border-slate-100 pt-4 mb-4">
          <div className="flex justify-between">
            <span className="text-slate-500">Capacity</span>
            <span className="font-semibold text-slate-800">{capacity} students</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Room Types</span>
            <span className="font-semibold text-slate-800">{rooms}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {amenities.map((a) => (
            <span key={a} className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SIF_IMAGES = [
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616395/2012ea3a-c7c3-433c-8b35-f6fcd0ac2ce4.png",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616370/e20b5512-6343-4021-b56b-6897e3420882.png",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616459/d0244aac-a45a-41e7-bc21-0fe5617c3dd0.png",
];

const FREYA_IMAGES = [
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616584/c0f0b628-b21e-4327-8f08-88f826fc62d4.png",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616613/facd449f-b512-4f38-928f-aafaba2f8730.png",
  "https://res.cloudinary.com/dblwlysku/image/upload/v1774616739/mtmk3kpw0gsymmw5o7wv.jpg",
];

const HOSTELS: never[] = [];

const AMENITIES = [
  { icon: Wifi,      title: "High-Speed WiFi",  desc: "1 Gbps campus-wide internet, 24/7 connectivity.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774616924/cf1da52b-c83d-49b9-b38b-193c91cd941b.png" },
  { icon: Utensils,  title: "Mess & Cafeteria", desc: "Nutritious meals, 4 times daily. Veg & non-veg options.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617000/24b5acf6-d945-4889-9d1f-935e950bbd9a.png" },
  { icon: Shield,    title: "24/7 Security",    desc: "CCTV surveillance, biometric access, security personnel.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617159/mnpjg2tniyankzb9ai4c.jpg" },
  { icon: Dumbbell,  title: "Fitness Center",   desc: "Fully equipped gym, yoga room, indoor sports.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617323/2f1c4db0-cdd6-4840-826e-4c2b722fd2bb.png" },
  { icon: BookOpen,  title: "Study Rooms",      desc: "Quiet study zones with AC, available 24/7.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617440/ttvpb2t21wsajzle5veo.jpg" },
  { icon: Wind,      title: "Laundry Service",  desc: "Automated laundry machines on every floor.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617633/jx60vg2po9kxp9mudnqd.jpg" },
];

const FEES = [
  { type: "Triple Sharing", fee: "₹60,000/year" },
  { type: "Double Sharing", fee: "₹80,000/year" },
  { type: "Single Room",    fee: "₹1,20,000/year" },
];

export default function HostelPage() {
  return (
    <div className="bg-white pt-16">
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center">
          <source src="https://res.cloudinary.com/dblwlysku/video/upload/v1774612575/hostel_life_cvuu6j.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0f172a]/75" />
        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Hostel</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Hostel Life</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            Your home away from home — safe, comfortable, and vibrant.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-12">

            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Hostel Blocks</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <SliderCard images={ODIN_IMAGES} name="Odin Block" type="Boys"
                  accentClass="text-blue-700 bg-blue-50" capacity={800}
                  rooms="Single & Double" amenities={["AC", "WiFi", "Gym", "Mess"]} />

                <SliderCard images={FREYA_IMAGES} name="Freya Block" type="Girls"
                  accentClass="text-pink-700 bg-pink-50" capacity={600}
                  rooms="Single & Double" amenities={["AC", "WiFi", "Common Room", "Mess"]} />

                <SliderCard images={LOKI_IMAGES} name="Loki Block" type="Boys"
                  accentClass="text-violet-700 bg-violet-50" capacity={500}
                  rooms="Double & Triple" amenities={["WiFi", "Mess", "Study Room"]} />

                <SliderCard images={SIF_IMAGES} name="Sif Block" type="Girls"
                  accentClass="text-amber-700 bg-amber-50" capacity={400}
                  rooms="Single & Double" amenities={["AC", "WiFi", "Mess", "Salon"]} />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Facilities & Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {AMENITIES.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.title} className="card overflow-hidden hover:shadow-md transition-shadow">
                      {a.img && (
                        <img src={a.img} alt={a.title} className="w-full h-36 object-cover" />
                      )}
                      <div className="p-6 flex gap-4">
                        <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#1e3a8a]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1">{a.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Fee Structure</h3>
                <p className="text-sm text-slate-500 mt-1">Per academic year</p>
              </div>
              <div className="divide-y divide-slate-100">
                {FEES.map((f) => (
                  <div key={f.type} className="p-6 flex justify-between items-center">
                    <span className="font-medium text-slate-700">{f.type}</span>
                    <span className="font-bold text-[#10b981]">{f.fee}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500">* Includes mess charges. AC rooms have additional charges.</p>
              </div>
            </div>

            <div className="card p-6 bg-[#1e3a8a] text-white">
              <h3 className="text-lg font-bold mb-3">Apply for Hostel</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Hostel allotment is done on a first-come, first-served basis after admission confirmation.
              </p>
              <Link href="/admissions" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200 transition-colors">
                Admissions →
              </Link>
            </div>

            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Quick Contact</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { label: "Hostel Office", value: "+91 80 2345 6795" },
                  { label: "Email",         value: "hostel@thorfinn.edu" },
                  { label: "Hours",         value: "9 AM – 6 PM" },
                ].map((item) => (
                  <div key={item.label} className="p-5">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
