import { useRef, useEffect, useState, useCallback } from "react";
import jsQR from "jsqr";
import BackArrow from "../../components/backArrow/backArrow";
import "./style.css";
import getDataFromClipboard from "../../functions/getDataFromClipboard";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // store the MediaStream for cleanup
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // required for iOS
        video.play();
        streamRef.current = stream;
        requestAnimationFrame(scan);
      })
      .catch((err) => console.error("Camera error:", err));

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQrData(code.data);
        }
      }
      requestAnimationFrame(scan);
    };
    return () => {
      console.log(streamRef);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handlePaste = async () => {
    const data = await getDataFromClipboard();
    console.log(data);
  };

  return (
    <div className="cameraContainer">
      <BackArrow />
      <div className="contentContainer">
        <p>Scan or pase an address/invoice</p>
        <div className="scanContianer">
          <video ref={videoRef} style={{ width: "100%" }} />
        </div>
        <button onClick={handlePaste}>Paste Address / Invoice</button>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}
