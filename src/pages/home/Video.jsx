import React, { useEffect, useRef, useState } from "react";
import Videocric from "../../assets/Videocric.mp4";
import { useNavigate } from "react-router-dom";

const VideoBanner = () => {

  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();


  // Play video safely

  useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    // REQUIRED for autoplay
    video.muted = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {

      playPromise

        .then(() => {

          // After autoplay works, enable sound

          video.muted = false;

          video.volume = 0.1;
          video.play();

        })

        .catch(() => {

          // If blocked, wait for user click

          const enableSound = () => {

            video.muted = false;

            video.volume = 0.1;

            video.play();

            document.removeEventListener("click", enableSound);

          };

          document.addEventListener("click", enableSound);

        });

    }

  }, []);



  // Show content after 10 sec

  useEffect(() => {

    const timer = setTimeout(() => {

      setShowContent(true);

    }, 10000);

    return () => clearTimeout(timer);

  }, []);



  return (

    <div className="relative h-screen w-full overflow-hidden">

      {/* VIDEO */}

      <video

        ref={videoRef}

        src={Videocric}

        autoPlay

        loop

        playsInline

        preload="auto"

        className="h-full w-full object-cover"

      />


      {/* OVERLAY */}

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40">

        <h1

          className={`

          text-green-400

          text-6xl

          font-bold

          transition-all

          duration-1000

          ${showContent

            ? "opacity-100 translate-y-0"

            : "opacity-0 translate-y-20"

          }

          `}

        >

          Your Game. Your Turf.

        </h1>


        <button

          onClick={() => navigate("/Grounds")}

          className={`

          mt-8

          bg-green-500

          px-8

          py-3

          rounded

          transition-all

          duration-1000

          ${showContent

            ? "opacity-100 scale-100"

            : "opacity-0 scale-75"

          }

          `}

        >

          Book Now

        </button>

      </div>

    </div>

  );

};

export default VideoBanner;