import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";

import BackArrow from "../../components/backArrow/backArrow";
import getDataFromClipboard from "../../functions/getDataFromClipboard";

import "./style.css";
import { Colors } from "../../constants/theme";
import CustomButton from "../../components/customButton/customButton";
import flashLightNoFill from "../../assets/flashlightNoFillWhite.png";
import flashLightFill from "../../assets/flashlight.png";
import images from "../../assets/images.png";

// QrScanner. = "/qr-scanner-worker.min.js"; // Adjust if you move the file

export default function Camera() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const didScan = useRef(false);
  const fileInput = document.getElementById("file-selector");
  const [pauseCamera, setPauseCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFlashlightOn, setIsFlashLightOn] = useState(false);

  useEffect(() => {
    if (pauseCamera || didScan.current || !videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        if (didScan.current) return;
        didScan.current = true;

        console.log(result.data);
        return;
        scanner.stop();
        setPauseCamera(true);
        navigate("/send", { state: { btcAddress: result.data } });
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: false,
        highlightCodeOutline: false,
      }
    );

    scanner.isFlashOn();
    scannerRef.current = scanner;

    scanner
      .start()
      .then(() => setIsCameraReady(true))
      .catch((err) => {
        console.error("Failed to start scanner:", err);
        setIsCameraReady(false);
      });

    return () => {
      scanner.stop();
      scanner.destroy();
      scannerRef.current = null;
    };
  }, [navigate, pauseCamera]);

  const handlePaste = async () => {
    if (didScan.current) return;
    didScan.current = true;

    setPauseCamera(true);
    const data = await getDataFromClipboard();
    navigate("/send", { state: { btcAddress: data } });
  };
  const toggleFlashLight = async () => {
    try {
      const hasFlash = await scannerRef.current.hasFlash();
      if (!hasFlash) {
        navigate("/error", {
          state: {
            errorMessage: "Device does not have a flash",
            background: location,
          },
        });
        return;
      }
      await scannerRef.current.toggleFlash();
      const isFlashOn = await scannerRef.current.isFlashOn();
      setIsFlashLightOn(isFlashOn);
    } catch (err) {
      console.log("camera flash error", err);
    }
  };

  const fileListener = () => {
    const file = fileInput.files[0];

    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        console.log(result);
        const qrData = result.data;
        if (didScan.current) return;
        didScan.current = true;
        navigate("/send", { state: { btcAddress: data } });

        fileInput.removeEventListener("change", fileListener);
      })
      .catch((e) => {
        navigate("/error", {
          state: {
            errorMessage: "No QR code found.",
            background: location,
          },
        });

        fileInput.removeEventListener("change", fileListener);
      });
  };
  const getDataFromFile = async () => {
    try {
      fileInput.addEventListener("change", fileListener);
      fileInput.click();
    } catch (err) {
      console.log("camera flash error", err);
    }
  };

  return (
    <div className="camera-page">
      <div className="backContainer">
        <BackArrow showWhite={true} />
      </div>
      <div id="video-container" className="example-style-2">
        <video
          ref={videoRef}
          className="camera-video"
          disablePictureInPicture
          playsInline
          muted
          style={{ width: "100%" }}
        />
        <div
          className="scan-region-highlight"
          style={{
            border: `4px solid ${Colors.light.blue}`,
          }}
        >
          {!isCameraReady && <p>Loading camera...</p>}
        </div>
      </div>
      <div onClick={getDataFromFile} className="fileContainer">
        <input hidden type="file" id="file-selector" accept="image/*" />
        <img className="optionImage" src={images} alt="images icon" />
      </div>
      <div onClick={toggleFlashLight} className="flashLightContainer">
        <img
          className="optionImage"
          src={isFlashlightOn ? flashLightFill : flashLightNoFill}
          alt="flash light icon"
        />
      </div>
      <CustomButton
        actionFunction={handlePaste}
        textContent={"Paste"}
        buttonClassName={"handleCameraPaste"}
        textClassName={"handleCameraPasteText"}
      />
    </div>
  );
}
