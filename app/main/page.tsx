"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const Weather = dynamic(() => import("../components/Weather"), { ssr: false });
const TopSearch = dynamic(() => import("../components/TopSearch"), {
  ssr: false,
});

function HomeContent() {
  const searchParams = useSearchParams();
  const locality_id = searchParams.get("locality_id") || null;
  const area = searchParams.get("area") || null;

  const [favArr, setFavArr] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedFavArr = localStorage.getItem("favArr");
      return savedFavArr ? JSON.parse(savedFavArr) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favArr", JSON.stringify(favArr));
  }, [favArr]);

  return (
    <div>
      <Weather
        locality_id={locality_id}
        area={area}
        favArr={favArr}
        setFavArr={setFavArr}
      />
      {/* Re-render TopSearch when locality_id or area changes */}
      <TopSearch key={`${locality_id}-${area}`} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
