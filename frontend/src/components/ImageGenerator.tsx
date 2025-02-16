import React, { useState, useRef } from 'react';
import { generateImage } from '../api/stableDiffusionClient';
import Webcam from 'react-webcam';
import './imageGenerator.css';

interface ImageGeneratorProps {
  variable: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ variable }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // Store webcam image
  const prompt = `Use the prompt image to generate 1 person wearing their traditional clothes from ${variable}`;
  
  const webcamRef = useRef<Webcam>(null);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const handleGenerate = async () => {
    console.log("Generating Image with:", { prompt, capturedImage }); // Debugging
    setLoading(true);
    setError(null);

    try {
      await generateImage(prompt, capturedImage, setImageUrl, setError, setLoading);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="image-generator">
      <div className="frame">
        {!capturedImage && !imageUrl && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={250}
            height={250}
            className="webcam"
          />
        )}
        {capturedImage && !imageUrl && (
          <img src={capturedImage} alt="Captured" className="captured-image" />
        )}
        {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
      </div>
      <div className="button-container">
        {!capturedImage && !imageUrl && (
          <button onClick={handleCapture}>Capture Photo</button>
        )}
        {capturedImage && !imageUrl && (
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        )}
        {capturedImage && (
          <button onClick={() => setCapturedImage(null)} disabled={loading}>
            Retake Photo
          </button>
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageGenerator;