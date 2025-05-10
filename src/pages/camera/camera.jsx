import { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import BackArrow from "../../components/backArrow/backArrow";

import "./style.css";
import getDataFromClipboard from "../../functions/getDataFromClipboard";
import { useNavigate } from "react-router-dom";
import SafeAreaComponent from "../../components/safeAreaContainer";

export default function Camera() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const didScan = useRef(false);
  const animationFrameId = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let isMounted = true;

    const scan = () => {
      return;
      if (!isMounted || !video || video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationFrameId.current = requestAnimationFrame(scan);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && !didScan.current) {
        didScan.current = true;
        // Stop camera resources before navigating
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        navigate("/send", { state: { btcAddress: code.data } });
        return; // Exit scan loop after successful scan
      }

      if (isMounted) {
        animationFrameId.current = requestAnimationFrame(scan);
      }
    };

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        video.srcObject = stream;
        video.setAttribute("playsinline", true);

        // Wait for video to be ready to play
        await video.play();

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        setIsCameraReady(true);
        animationFrameId.current = requestAnimationFrame(scan);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    setupCamera();

    // Cleanup function
    return () => {
      console.log("Camera component unmounting, cleaning up resources");
      isMounted = false;
      setIsCameraReady(false);

      // Cancel animation frame first
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }

      // Then stop all tracks
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
          console.log("Track stopped:", track.kind);
        });
        streamRef.current = null;
      }

      // Clear video source
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.load(); // Force video to clear its source
      }
    };
  }, [navigate]);

  const handlePaste = async () => {
    if (didScan.current) return;
    didScan.current = true;

    // Stop camera resources before navigating
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    const data = await getDataFromClipboard();
    navigate("/send", { state: { btcAddress: data } });
  };

  return (
    <div className="camera-page">
      <video ref={videoRef} className="camera-video" playsInline muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="camera-overlay">
        <div className="overlay">
          <div className="backContainer">
            <BackArrow showWhite={true} />
          </div>
          {/* <div className="top-row">
            <div className="qr-vertical-buttons"> */}
          {/* <button onClick={toggleFlash}>
            <img
              className="icon"
              src={
                isFlashOn ? ICONS.FlashLightIcon : ICONS.flashlightNoFillWhite
              }
              alt="Flash Toggle"
            />
          </button>
          <button onClick={getPhoto}>
            <img className="icon" src={ICONS.ImagesIcon} alt="Gallery" />
          </button> */}
          {/* </div>
          </div> */}
        </div>

        <div className="middle-row">
          <div className="overlay" />
          <div className="qr-box-outline">
            {!isCameraReady && <p>Loading Camera...</p>}
          </div>
          <div className="overlay" />
        </div>

        <div className="overlay">
          <div className="bottom-controls">
            <button className="paste-btn" onClick={handlePaste}>
              Paste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
