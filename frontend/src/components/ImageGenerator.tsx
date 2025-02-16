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
    <div style={{ textAlign: 'center' }}>

      {/* Square Frame Placeholder */}
      <div
        style={{
          width: '200px',
          height: '200px',
          border: '2px solid black',
          borderRadius: '10px',
          margin: '20px auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {capturedImage ? (
          // Display captured or generated image
          <img
            src={imageUrl || capturedImage}
            alt={imageUrl ? 'Generated' : 'Captured'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          // Display WebcamCapture component if no image is captured
          <WebcamCapture onCapture={handleCapture} />
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading || !capturedImage}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading || !capturedImage ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: loading || !capturedImage ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageGenerator;