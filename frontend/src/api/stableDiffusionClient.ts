import axios from 'axios';

const generateImage = async (
  prompt: string,
  image: string | null, // Captured image for img2img
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setError(null);
  setLoading(true);
  const apiKey = import.meta.env.VITE_STABLE_DIFFUSION_API_KEY;
  const url = 'https://api.stability.ai/v2beta/stable-image/generate/core';

  if (!apiKey) {
    setError("Missing API key");
    setLoading(false);
    return;
  }

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('output_format', 'png');

    if (image) {
      console.log("Using Captured Image for img2img:", image); // Debugging
    
      const blob = await fetch(image).then(res => res.blob());
      console.log("Converted Blob:", blob); // Ensure it's a valid image file
    
      formData.append('init_image', blob, 'image.png');
    }

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      responseType: 'json',
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.image) {
        setImageUrl(`data:image/png;base64,${data.image}`);
      } else {
        setError('Unexpected response format');
      }
    } else {
      setError(`Error: ${response.status}`);
    }
  } catch (error: any) {
    setError(error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};

export { generateImage };
