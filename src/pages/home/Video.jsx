import React, { useEffect, useRef, useState } from "react";
import Videocric from "../../assets/Videocric.mp4";
import { useNavigate } from "react-router-dom";

const VideoBanner = () => {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const [videoError, setVideoError] = useState(false);
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
        })
        .catch(() => {
          // If blocked, wait for user click
          setVideoError(true);
        });
    }
  }, []);

  // Show content after 3 sec (reduced from 10)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* VIDEO or FALLBACK */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={Videocric}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          onError={handleVideoError}
        />
      ) : (
        /* Fallback background when video fails */
        <div className="h-full w-full bg-gradient-to-br from-green-900 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-green-400">CRICBOX</h1>
            <p className="text-xl text-gray-300 mt-2">Your Game. Your Turf.</p>
          </div>
        </div>
      )}

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
