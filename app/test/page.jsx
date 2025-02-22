"use client"
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleSuccess = (result) => {
    console.log(result);
    const uploadedUrl = result.info.secure_url; 
    setImageUrl(uploadedUrl); 
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="unsign"
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button onClick={() => open()}>Upload an Image</button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div>
          <h3>Uploaded Image URL:</h3>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
