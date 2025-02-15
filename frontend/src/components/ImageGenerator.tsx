import React, { useState } from 'react';
import { generateImage } from '../api/stableDiffusionClient';
import WebcamCapture from './WebcamCapture';

const ImageGenerator: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // Store webcam image
  const prompt = "Use the prompt image to generate 1 person wearing their traditional clothes"; // Constant prompt

  const handleCapture = (capturedImage: string) => {
    console.log("Received Image from Webcam:", capturedImage); // Debugging
    setCapturedImage(capturedImage);
  };

  const handleGenerate = () => {
    console.log("Generating Image with:", { prompt, capturedImage }); // Debugging
    generateImage(prompt, capturedImage, setImageUrl, setError, setLoading);
  };
  
  return (
    <div>
      <h1>Stable Diffusion Image Generator</h1>
      <WebcamCapture onCapture={setCapturedImage} /> {/* Get webcam image */}

      <button onClick={handleGenerate} disabled={loading || !capturedImage}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;
