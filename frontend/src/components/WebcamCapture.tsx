import React, { useRef, useState } from 'react';

const WebcamCapture: React.FC<{ onCapture: (imageData: string) => void }> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCapture = async () => {
    setIsCapturing(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataUrl = canvasRef.current.toDataURL('image/png');
  
        console.log("Captured Image (Base64):", dataUrl); // Debugging
  
        onCapture(dataUrl); // Send it to the parent component
        stopCapture();
      }
    }
  };  

  const stopCapture = () => {
    setIsCapturing(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="webcam-capture">
      {isCapturing ? (
        <>
          <video ref={videoRef} width="320" height="240" />
          <button onClick={capturePhoto}>Capture Photo</button>
          <button onClick={stopCapture}>Stop Capture</button>
        </>
      ) : (
        <button onClick={startCapture}>Start Capture</button>
      )}
      <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }} />
    </div>
  );
};

export default WebcamCapture;
