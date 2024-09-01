"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";

function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      router.push("/home");
    };

    const timeoutId = setTimeout(() => {
      handleRedirect();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <>
      <div className="relative w-full h-screen font-bold">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/cloud.mp4"
          autoPlay
          loop
          muted
        />
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center px-4">
          <h1 className="text-white text-2xl mb-4">Welcome to Weather Union</h1>
          <h2 className="text-white text-xl max-w-screen-md leading-relaxed">
            Whatever locality data you want to check, we have it here
          </h2>
        </div>
      </div>
    </>
  );
}
